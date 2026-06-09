import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { LoginScreen, ProfilePage } from "./components";

const API_URL = import.meta.env.VITE_BACKEND_URL

function UserPages(){
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function checkCookie(){
            try {
                let res = await axios.get(`${API_URL}/users/profile`, );
                console.log(res);
                res = res.data.status;
                if(res === 'authorised'){
                    setLoggedIn(true);
                }
            } catch {
                console.log('Error');
            }
        }
        checkCookie()
    }, []);

    if(loggedIn === false){
        return <>
        <LoginScreen />
        </>
    } else if(loggedIn === true) {
        return <>
        <ProfilePage/>
        </>
    }
}

export default UserPages;