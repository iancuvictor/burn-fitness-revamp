import { LoginScreen, ProfilePage, AdminDashboard } from "./components";
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';


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
        return <div className="relative h-full w-full">
            <AdminDashboard/>
        </div>
    }
}

export default UserPages;