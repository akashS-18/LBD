import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Authentication functions
async function signUp(email, password, fullName) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });

        if (error) throw error;

        // Log the sign-up event
        await logAuthEvent('sign_up', email);
        
        return { data, error: null };
    } catch (error) {
        console.error('Error signing up:', error.message);
        return { data: null, error: error.message };
    }
}

async function signIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        // Log the sign-in event
        await logAuthEvent('sign_in', email);
        
        return { data, error: null };
    } catch (error) {
        console.error('Error signing in:', error.message);
        return { data: null, error: error.message };
    }
}

async function signOut() {
    try {
        // Get current user email before signing out
        const { data: { user } } = await supabase.auth.getUser();
        const email = user?.email;

        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        // Log the sign-out event
        if (email) {
            await logAuthEvent('sign_out', email);
        }

        return { error: null };
    } catch (error) {
        console.error('Error signing out:', error.message);
        return { error: error.message };
    }
}

async function logAuthEvent(event_type, email) {
    try {
        const { error } = await supabase
            .from('auth_logs')
            .insert([
                {
                    event_type,
                    email,
                    timestamp: new Date().toISOString()
                }
            ]);

        if (error) throw error;
    } catch (error) {
        console.error('Error logging auth event:', error.message);
    }
}

// Function to get current user
async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return { user, error: null };
    } catch (error) {
        console.error('Error getting current user:', error.message);
        return { user: null, error: error.message };
    }
}

// Function to check if user is authenticated
async function isAuthenticated() {
    const { user, error } = await getCurrentUser();
    return { isAuthenticated: !!user, user };
}

export {
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    isAuthenticated
}; 