import { supabase } from "../supabaseClient";

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