import { supabase } from "../supabaseClient";

// Helper function to get or create a study spot
const getOrCreateStudySpot = async (studySpot) => {
    try {
        // Check if the study spot already exists
        const { data: existingSpot, error: fetchError } = await supabase
            .from('study_spots')
            .select('id')  // Select only the ID
            .eq('name', studySpot.name)
            .eq('address', studySpot.address)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            throw fetchError;
        }

        if (existingSpot) {
            // Return the ID of the existing study spot
            return existingSpot.id;
        }

        // If the study spot doesn't exist, create it and return the ID
        const { data: newSpot, error: insertError } = await supabase
            .from('study_spots')
            .insert([studySpot])
            .select('id')  // Ensure we return the newly created ID
            .single();

        if (insertError) {
            throw insertError;
        }

        // Return the ID of the newly created study spot
        return newSpot.id;
    } catch (error) {
        console.error('Error in getOrCreateStudySpot:', error);
        throw error;
    }
};

// Function to create a post, upload images, and insert image URLs
export const createPost = async (post, images, userId) => {
    try {
        // Step 1: Ensure the study spot exists or create it
        const studySpotId = await getOrCreateStudySpot({
            user_id: userId,
            name: post.study_spot_name,
            address: post.study_spot_address,
            location_category_id: post.study_spot_category_id,
        });

        console.log('Successfully created or found study spot:', studySpotId);

        // Step 2: Create the post
        const { data: postData, error: postError } = await supabase
            .from('post')  // Ensure this matches your actual table name
            .insert([{
                user_id: userId,
                study_spots_id: studySpotId,
                cost_rating: post.cost_rating,
                star_rating: post.star_rating,
                description: post.description,
            }])
            .select('*');  // Fetch the inserted record

        if (postError) {
            console.error('Error creating post:', postError);
            throw postError;
        }

        const postId = postData?.[0]?.id;
        if (!postId) {
            throw new Error('Post ID is null or undefined');
        }
        console.log("Post ID:", postId);

        // Step 3: Upload multiple images and collect their URLs
        const imageUrls = await Promise.all(images.map(async (image, index) => {
            const fileExtension = image.name.split('.').pop();  // Get the extension
            const fileName = `${userId}/${postId}/image_${index + 1}.${fileExtension}`;
            console.log("Uploading file to:", fileName);  // Log the file path

            const { error: uploadError } = await supabase.storage
                .from('post_image')
                .upload(fileName, image);

            if (uploadError) {
                console.error("Error uploading file:", uploadError);
                throw uploadError;
            }

            // Get the public URL of the uploaded image
            const { data: publicUrlData } = supabase.storage
                .from('post_image')
                .getPublicUrl(fileName);

            if (!publicUrlData || !publicUrlData.publicUrl) {
                throw new Error(`Failed to get public URL for ${fileName}`);
            }

            console.log("Generated public URL:", publicUrlData.publicUrl);

            return {
                post_id: postId,
                image_url: publicUrlData.publicUrl,
            };
        }));

        // Step 4: Insert image URLs into the post_images table
        const { data: imageData, error: imageError } = await supabase
            .from('post_images')
            .insert(
                imageUrls
            );

        if (imageError) {
            console.error("Error inserting image URLs:", imageError);
            throw imageError;
        }

        // Step 5: Handle tags
        const tagPromises = post.tags.map(tag => supabase
            .from('post_tags')
            .insert([{ post_id: postId, tag_id: tag.id }])
        );

        await Promise.all(tagPromises);

        return { postData, imageData };
    } catch (error) {
        console.error('Error in createPost:', error);
        throw error;
    }
};
