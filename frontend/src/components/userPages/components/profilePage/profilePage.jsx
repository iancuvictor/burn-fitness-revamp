import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import { NavLink } from 'react-router';

const API_URL = import.meta.env.VITE_BACKEND_URL


function ProfilePage(){
    const { setLoggedIn, setUser } = useContext(AuthContext)
    const { user } = useContext(AuthContext)

    const logOut = () => {
        axios.post(`${API_URL}/users/logout`);
        setLoggedIn(false);
        setUser();
    } 

    return <div className='font-finlandica flex flex-col justify-center items-center'>
    <h1 className='text-[25px]'>Bine ai revenit {user.username}</h1>
    <h1>Abonamente active:</h1>
    {user.activeSubscriptions.length > 0
        ? user.activeSubscriptions.map((abonament) => {
            <div>
                <h1>{abonament.titlu}</h1>
                <h1>{abonament.valoare}</h1>
                <h1>{abonament.dataExpirare}</h1>
            </div>
        })
        : <h1>Nu ai nici un abonament activ. <NavLink to='/abonamente'>Cumpără unul aici</NavLink></h1>
    }
    <button onClick={() => logOut()} className='cursor-pointer'>Log Out</button>
    </div>
}

export default ProfilePage;