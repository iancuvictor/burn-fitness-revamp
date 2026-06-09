import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { LoginScreen, ProfilePage } from "./components";

const API_URL = import.meta.env.VITE_BACKEND_URL

function UserPages(){
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function checkCookie(){
            let res = await axios.get(`${API_URL}/users/profile`, );
            res = res.data.status;
            if(res === 'authorised'){
                setLoggedIn(!loggedIn);
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