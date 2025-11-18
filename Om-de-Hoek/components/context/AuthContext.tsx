import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextData {
    signIn: (token: string, refreshToken: string) => Promise<void>;
    signOut: () => Promise<void>;
    refreshToken: string | null;       // Hier kun je een specifiek User type definiëren
    token: string | null;
    authStatus: 'loading' | 'authenticated' | 'unauthenticated';
}

const AuthContext = createContext<AuthContextData>({
    signIn: async () => {},
    signOut: async () => {},
    refreshToken: null,
    token: null,
    authStatus: 'loading', // Start als 'loading'
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

    useEffect(() => {
        const loadAuthState = async () => {
            try {
                const savedToken = await SecureStore.getItemAsync('authToken');
                const savedRefreshToken = await SecureStore.getItemAsync('refreshToken');

                if (savedToken && savedRefreshToken) {
                    setToken(savedToken);
                    setRefreshToken(savedRefreshToken)
                    setAuthStatus('authenticated');
                } else {
                    setAuthStatus('unauthenticated');
                }
            } catch (e) {
                console.error("Failed to load auth state", e);
                setAuthStatus('unauthenticated');
            }
        };

        loadAuthState();
    }, []);

    const signIn = async (newToken: string, newRefreshToken: string) => {
        try {
            await SecureStore.setItemAsync('authToken', newToken);
            await SecureStore.setItemAsync('refreshToken', newRefreshToken);

            setToken(newToken);
            setRefreshToken(newRefreshToken)
            setAuthStatus('authenticated');

        } catch (e) {
            console.error("Failed to sign in", e);
        }
    };

    const signOut = async () => {
        try {
            await SecureStore.deleteItemAsync('authToken');
            await SecureStore.deleteItemAsync('refreshToken');

            setToken(null);
            setRefreshToken(null);
            setAuthStatus('unauthenticated');

        } catch (e) {
            console.error("Failed to sign out", e);
        }
    };

    // De waarde die de context doorgeeft aan alle consumenten (via useAuth)
    const value = {
        signIn,
        signOut,
        refreshToken,
        token,
        authStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};