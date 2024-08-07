import { supabase } from '../../services/supabaseClient';

// Function to sign in user
export const signIn = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.log('SignIn Error:', error.message);
            return { error };
        }

        if (data && data.session) {
            const userSession = data.session;
            sessionStorage.setItem('user', JSON.stringify(userSession.user));
            localStorage.setItem('authToken', userSession.access_token);
            return { data };
        }
    } catch (error) {
        console.error('Unexpected Error:', error);
        return { error };
    }
}

// Function to sign up user
export const signUp = async (email, first_name, last_name, password) => {

    // Do a Try Catch block to catch any errors
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            console.log('SignUp Error:', error.message);
            return { error };
        }

        console.log("Successfully signed up");

        // After using Supabase sign up w/ auth, we need to insert the user's profile data
        if (data && data.user) {
            const userId = data.user.id; // Get the user's ID
            const profileData = await insertProfileData(userId, email, first_name, last_name); // Insert the user's profile data
            return { data, profileData };
        }


    } catch (error) {
        console.error('Unexpected Error:', error);
        return { error };
    }
}

// Helper function to insert user profile data
const insertProfileData = async (userId, email, first_name, last_name) => {
    try {
        const { data, error } = await supabase
            .from('profile')
            .insert([
                { user_id: userId, email: email, first_name: first_name, last_name: last_name, created_at: new Date() }
            ]);

        if (error) {
            console.log('Insert Profile Data Error:', error.message);
            return { error };
        } else {
            // If successful, log that the data was inserted
            console.log("Profile data inserted");
            return { data };
        }
    } catch (error) {
        console.error('Unexpected Error:', error);
        return { error };
    }
}
