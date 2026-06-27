import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { AuthContext } from './AuthContext'

const API_URL = import.meta.env.VITE_BACKEND_URL;

function AuthProvider({children}){
    const [user, setUser] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        let response = await axios.get(`${API_URL}/users/profile`, { withCredentials: true });
        let userData = response.data.userData;
        setUser(userData);
    }

    useEffect(() => {
        async function checkCookie(){
            try {
                let response = await axios.get(`${API_URL}/users/profile`, { withCredentials: true });
                let userData = response.data.userData;
                let resStatus = response.data.status;
                if(resStatus === 'authorised' && userData.isAdmin === false){
                    setLoggedIn(true);
                    setUser(userData);
                } else if(resStatus === 'authorised' && userData.isAdmin === true){
                    setLoggedIn(true);
                    setUser(userData);
                    setIsAdmin(true);
                }
                setLoading(false);
            } catch {
                console.log('Error');
                setLoading(false);
            }
        }
        checkCookie()
    }, []);

    return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn, user, setUser, isAdmin, setIsAdmin, loading, setLoading, refreshUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;