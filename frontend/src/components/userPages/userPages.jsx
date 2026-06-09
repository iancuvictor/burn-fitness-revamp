import { LoginScreen, ProfilePage } from "./components";
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';


function UserPages(){
    const { loggedIn } = useContext(AuthContext)

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