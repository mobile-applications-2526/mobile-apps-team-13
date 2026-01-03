import React, {createContext, useContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import authService from "@/services/authService";
import {statusCheck} from "@/services/requestService";
import {saveInStorage} from "@/utils/StorageHandler";

interface AuthContextData {
    signIn: (token: string, refreshToken: string) => Promise<void>;
    signOut: () => Promise<void>;
    refreshToken: string | null;
    token: string | null;
    authStatus: 'loading' | 'authenticated' | 'unauthenticated' | "unavailable";
    refreshTokens: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({
    signIn: async () => {},
    signOut: async () => {},
    refreshToken: null,
    token: null,
    authStatus: 'loading',
    refreshTokens: async () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const MAX_CONNECTION_ATTEMPTS = 5;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated' | "unavailable">('loading');

    useEffect(() => {
        const loadAuthState = async () => {
            try {
                setAuthStatus("loading")
                const savedToken = await SecureStore.getItemAsync('authToken');
                const savedRefreshToken = await SecureStore.getItemAsync('refreshToken');

                const API_PATH = process.env.EXPO_PUBLIC_API_URL;

                if(API_PATH) {
                   await saveInStorage("API_PATH", API_PATH);
                }

                let connectionAttempts = 0;
                let connected = false;

                while (connectionAttempts < MAX_CONNECTION_ATTEMPTS && !connected) {
                    try {
                        // Simpele ping om te checken of de backend bereikbaar is
                        connected = await statusCheck();
                        if (!connected) throw new Error("Backend not reachable");
                    } catch (e) {
                        connectionAttempts++;
                        console.warn(`Backend not reachable, attempt ${connectionAttempts}/${MAX_CONNECTION_ATTEMPTS}`);
                        await new Promise(res => setTimeout(res, 2000)); // Wacht 2 seconden voor de volgende poging
                    }
                }

                if(!connected) {
                    console.error("Backend is not reachable after multiple attempts.");
                    setAuthStatus('unavailable');
                    return;
                }

                if (savedToken && savedRefreshToken) {
                    const newToken = await authService.refreshToken(savedRefreshToken);
                    await signIn(newToken.token, newToken.refreshToken);
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
            await authService.logout(refreshToken ?? ""); // als dit faalt, is token waarschijnlijk al vervallen, mag logout niet verbieden
            await SecureStore.deleteItemAsync('authToken');
            await SecureStore.deleteItemAsync('refreshToken');

            setToken(null);
            setRefreshToken(null);
            setAuthStatus('unauthenticated');

        } catch (e) {
            console.error("Failed to sign out", e);
        }
    };

    const refreshTokens = async () => {
        try {
            if(!refreshToken) {
                setAuthStatus("unauthenticated")
                return;
            }
            const newToken = await authService.refreshToken(refreshToken);
            await SecureStore.setItemAsync('authToken', newToken.token);
            await SecureStore.setItemAsync('refreshToken', newToken.refreshToken);

            setToken(newToken.token);
            setRefreshToken(newToken.refreshToken);
            setAuthStatus('authenticated');
        } catch (e) {
            console.error("Failed to refresh tokens", e);
            setAuthStatus("unauthenticated")
        }
    };

    // De waarde die de context doorgeeft aan alle consumenten (via useAuth)
    const value = {
        signIn,
        signOut,
        refreshToken,
        token,
        authStatus,
        refreshTokens
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};