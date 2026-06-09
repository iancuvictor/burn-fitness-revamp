import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL


function ProfilePage(){
    const { setLoggedIn, setUser } = useContext(AuthContext)

    const logOut = () => {
        axios.post(`${API_URL}/users/logout`);
        setLoggedIn(false);
        setUser();
    }

    const { user } = useContext(AuthContext)
    console.log(user);
    return <div className='font-finlandica flex flex-col justify-center items-center'>
    <h1 className='text-[25px]'>Bine ai revenit {user.username}</h1>
    <button onClick={() => logOut()} className='cursor-pointer'>Log Out</button>
    </div>
}

export default ProfilePage;