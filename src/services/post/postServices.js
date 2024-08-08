import { supabase } from "../supabaseClient";

// Helper function to get or create a study spot
const getOrCreateStudySpot = async (studySpot) => {
    // Check if the study spot already exists
    const { data: existingSpot, error: fetchError } = await supabase
        .from('study_spots')
        .select('*')
        .eq('name', studySpot.name)
        .eq('address', studySpot.address)
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
    }

    if (existingSpot) {
        return existingSpot.id;
    }

    // If the study spot doesn't exist, create it
    const { data: newSpot, error: insertError } = await supabase
        .from('study_spots')
        .insert([studySpot])
        .single();

    if (insertError) {
        throw insertError;
    }

    return newSpot.id;
};

export const createPost = async (post, images) => {
    // Step 1: Ensure the study spot exists or create it
    const studySpotId = await getOrCreateStudySpot({
        name: post.study_spot_name,
        address: post.study_spot_address,
        location_category_id: post.study_spot_category_id,
        user_id: post.user_id
    });

    // Step 2: Create the post
    const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([{
            user_id: post.user_id,
            study_spots_id: studySpotId,
            cost_rating: post.cost_rating,
            star_rating: post.star_rating,
            description: post.description
        }])
        .single();

    if (postError) {
        throw postError;
    }

    const postId = postData.id;

    // Step 3: Upload images and collect their URLs
    const uploadPromises = images.map((image, index) => {
        const filePath = `${post.user_id}/${postId}/image_${index + 1}.jpg`;
        return supabase.storage.from('post_images').upload(filePath, image);
    });

    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map((result, index) => ({
        post_id: postId,
        image_url: supabase.storage.from('post_images').getPublicUrl(`${post.user_id}/${postId}/image_${index + 1}.jpg`).publicURL,
    }));

    // Step 4: Insert image URLs into the post_images table
    const { data: imageData, error: imageError } = await supabase
        .from('post_images')
        .insert(imageUrls);

    if (imageError) {
        throw imageError;
    }

    // Step 5: Handle tags
    const tagPromises = post.tags.map(tag => supabase
        .from('post_tags')
        .insert([{ post_id: postId, tag_id: tag.id }])
    );

    await Promise.all(tagPromises);

    return { postData, imageData };
};
