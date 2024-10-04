import { createContext, useContext, useEffect, useState } from "react";
import baseUrl from "../services/baseUrl";
import { useDispatch } from "react-redux";
import { initializeCartFromLocalStorage, setInitialState } from "@/lib/slices/cartSlice";


export const AuthContext = createContext();
export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeCartFromLocalStorage());
    }, [dispatch]);

    useEffect(() => {
        const fetchUserData = async (userId) => {
            setLoadingUser(true);
            try {
                const response = await fetch(`${baseUrl}/api/auth/user/${userId}`);
                if (response.ok) {
                    const userData = await response.json();
                    setAuthUser(userData);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoadingUser(false);
            }
        };

        try {
            const userIdString = localStorage.getItem('userId');
            if (userIdString) {
                const userId = JSON.parse(userIdString);
                if (userId) {
                    fetchUserData(userId);
                } else {
                    console.warn('userId is null or undefined');
                    setLoadingUser(false);
                }
            } else {
                console.warn('No userId found in localStorage');
                setLoadingUser(false);
            }
        } catch (error) {
            console.error('Error parsing userId from localStorage:', error);
            setLoadingUser(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loadingUser }}>
            {children}
        </AuthContext.Provider>
    );
};
