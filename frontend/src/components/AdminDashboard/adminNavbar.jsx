import { NavLink } from "react-router";
import BurnLogo from '../navbar/assets/burnLogo.svg'
import { useState, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import PopUp from "../popUps/popUp";
import axios from 'axios';

const buttonClass = ({isActive}) => isActive ? 'z-1 text-black underline underline-offset-5' : 'hover:text-black hover:underline underline-offset-5 duration-150'
const API_URL = import.meta.env.VITE_BACKEND_URL;

function AdminNavbar(){
    const { setLoggedIn, setIsAdmin } = useContext(AuthContext);
    const [alert, setAlert] = useState({
        logOut: false,
      });

    const logOut = async () => {
    await axios.post(`${API_URL}/users/logout`);
    setLoggedIn(false);
    setIsAdmin(false);
  };


    return <div id='navbar' className={`sticky top-0 left-0 shadow-md z-2 flex flex-row items-between top-0 w-full h-20 gap-5 bg-white items-center justify-between pl-10 pr-10`}>
        <NavLink to="/admin" className={buttonClass}><img src={BurnLogo} alt="burn fitness logo" className='w-40 select-none'/></NavLink>
        <div className='hidden md:flex flex-row flex-wrap font-[500] text-[16px] gap-2.5 xl:gap-5 items-center justify-end md:pr-0'>
            <NavLink to="/admin/paginiPublice" className={buttonClass}>Pagini publice</NavLink>
            <NavLink to="/admin/abonamente" className={buttonClass}>Abonamente</NavLink>
            <NavLink to="/admin/orar" className={buttonClass}>Orar</NavLink>
            <NavLink to="/admin/clienti" className={buttonClass}>Clienti</NavLink>
            <NavLink to="/admin/blog" className={buttonClass}>Blog</NavLink>
            <NavLink to="/admin/galerie" className={buttonClass}>Galerie foto</NavLink>
            <button
        onClick={() => setAlert({ ...alert, logOut: true })}
        className="cursor-pointer bg-rose-500 text-white p-2 rounded-md text-[14px]"
      >
        Log Out
      </button>
        </div>
        <div className={`${alert.logOut ? "z-4 fixed top-0 left-0" : "hidden"}`}>
        <PopUp
          type="alert"
          message="Ești sigur că vrei să te deconectezi?"
          ifYes={logOut}
          ifNo={() => setAlert({ ...alert, logOut: false })}
        />
      </div>
    </div> 
}

export default AdminNavbar;