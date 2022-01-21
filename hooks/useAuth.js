import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import * as Google from "expo-google-app-auth";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth';
import { auth } from '../firebase';
const AuthContext = createContext({});

const config = {
    androidClientId: "597696217487-rnsufqc6pb89uud98dgk7m259b7cq4cl.apps.googleusercontent.com",
    iosClientId: "597696217487-ff59eah9tvvh535prak31e7f5gvl0il8.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }

                setLoadingInitial(false);
            }),
        []
    );

    const logout = () => {
        setLoading(true);

        signOut(auth)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    };


    const signInWithGoogle = async () => {
        setLoading(true);

        await Google.logInAsync(config).then(async (loginInResult) => {
            if (loginInResult.type === 'success') {
                const { idToken, accessToken } = loginInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);

                await signInWithCredential(auth, credential);
            }
            return Promise.reject();
        }).catch(error => setError(error))
            .finally(() => setLoading(false));
    };

    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            signInWithGoogle,
            logout,
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider
            value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}