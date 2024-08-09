import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            // Get the token from localStorage
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    // Check the session using Supabase auth
                    const { data: { user }, error } = await supabase.auth.getUser();

                    if (error) {
                        console.error('Token verification failed:', error.message);
                        setIsAuthenticated(false);
                        setUser(null);
                    } else {
                        console.log('User is authenticated:', user.email);
                        setIsAuthenticated(true);
                        setUser(user);
                    }
                } catch (error) {
                    console.error('An error occurred:', error.message);
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        checkAuthentication();
    }, []);

    // logout function
    const logout = () => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        supabase.auth.signOut();
        console.log("User logged out");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    return useContext(AuthContext);
};