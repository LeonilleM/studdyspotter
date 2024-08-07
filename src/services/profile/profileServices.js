import { supabase } from "../supabaseClient";

export const fetchUserInfo = async () => {
    try {

        // Retreive user from session storage
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (!storedUser) {
            return null;
        }

        // Get user id
        const userId = storedUser.id;

        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('Error fetching user info:', error);
            return { error };
        }

        // Return user info
        return data;

    } catch (error) {
        console.error('Unexpected Error:', error);
        return { error };
    }
}
