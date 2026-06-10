import { LoginScreen, ProfilePage } from "./components";
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';


function UserPages(){
    const { loggedIn } = useContext(AuthContext)

    if(loggedIn === false){
        return <div className="relative h-full w-full">
        <LoginScreen />
        </div>
    } else if(loggedIn === true) {
        return <div className="relative h-full w-full">
        <ProfilePage/>
        </div>
    }
}

export default UserPages;