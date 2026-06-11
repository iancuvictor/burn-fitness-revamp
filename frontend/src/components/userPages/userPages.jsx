import { LoginScreen, ProfilePage } from "./components";
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from "react-router";


function UserPages(){
    const { loggedIn, isAdmin } = useContext(AuthContext)

    if(loggedIn === false){
        return <div className="relative h-full w-full">
        <LoginScreen />
        </div>
    } else if(loggedIn === true && isAdmin === false) {
        return <div className="relative h-full w-full">
        <ProfilePage/>
        </div>
    } else if(isAdmin === true){
        return <Navigate to='/admin'/>
    }
}

export default UserPages;