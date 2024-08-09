import { supabase } from '../../services/supabaseClient';

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
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

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @param {*} first_name 
 * @param {*} last_name 
 * @returns 
 * Function to sign up user with email and password
 */
export const signUp = async (email, password, first_name, last_name) => {
    try {
        const { data, error } = await supabase.auth.signUp({ // Sign up user
            email,
            password,
            options: { // Additional data to be stored in the profile table
                data: {
                    first_name,
                    last_name
                }
            }
        });

        if (error) {
            console.log('SignUp Error:', error.message);
            return { error };
        }

        if (data && data.user) {
            const userSession = data
            sessionStorage.setItem('user', JSON.stringify(userSession.user));
            localStorage.setItem('authToken', userSession.access_token);
            return { data };
        }

        console.log("Successfully signed up:", data);
        return { data };
    } catch (error) {
        console.error('Unexpected Error:', error);
        return { error };
    }
}
