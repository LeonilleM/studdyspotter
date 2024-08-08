import { supabase } from "../supabaseClient";

// Returns all post data
export const fetchPost = async () => {
    try {
        const { data, error } = await supabase
            .from('post')
            .select(`
                id,
                cost_rating,
                star_rating,
                description,
                created_at,
                profile:user_id (
                    first_name,
                    last_name  
                ),
                study_spots:study_spots_id (
                    name,  
                    address,
                    location_category:location_category_id (
                        name
                    )
                ),
                tags:post_tags (
                    tags:tag_id (
                        name
                    )
                )
            `)
        if (error) {
            throw error
        }

        // Process data to aggregate images and tags
        const processedData = data.map(post => {

            // Aggregate tags
            const tags = post.tags.map(tagRelation => tagRelation.tags.name).join(', ');

            return {
                ...post,

                tags_list: tags
            }
        });
        console.log(processedData)
        return processedData; // Returns an array of post data with aggregated images and tags
    } catch (error) {
        console.log(error)
    }
}


// Returns cost_rating category
export const getCostRating = async () => {
    try {
        const { data, error } = await supabase
            .from('cost_rating')
            .select('*')
        if (error) {
            throw error
        }
        return data
    }
    catch (error) {
        console.log(error)
    }
}
// Returns location_category
export const getLocationCategory = async () => {
    try {
        const { data, error } = await supabase
            .from('location_category')
            .select('*')
        if (error) {
            throw error
        }
        return data
    }
    catch (error) {
        console.log(error)
    }
}

// Returns tags
export const getTags = async () => {
    try {
        const { data, error } = await supabase
            .from('tags')
            .select('*')
        if (error) {
            throw error
        }
        return data
    }
    catch (error) {
        console.log(error)
    }
}

// Returns Study Spots for user to easily check if the study spot already exists
export const getStudySpots = async () => {
    try {
        const { data, error } = await supabase
            .from('study_spots')
            .select('*')
        if (error) {
            throw error
        }
        return data
    }
    catch (error) {
        console.log(error)
    }
}