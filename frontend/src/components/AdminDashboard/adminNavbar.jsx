import { NavLink } from "react-router";
import BurnLogo from '../navbar/assets/burnLogo.svg'

function AdminNavbar(){
    const buttonClass = ({isActive}) => isActive ? 'z-1 text-black underline underline-offset-5' : 'hover:text-black hover:underline underline-offset-5 duration-150'

    return <div id='navbar' className={`sticky shadow-2xl z-2 flex flex-col top-0 w-full pt-[50px] pb-[50px] min-h-screen gap-5 bg-white items-center justify-between`}>
        <NavLink to="/admin" className={buttonClass}><img src={BurnLogo} alt="burn fitness logo" className='w-40 select-none'/></NavLink>
        <div className='hidden md:flex flex-col flex-wrap font-[500] text-[16px] gap-2.5 xl:gap-5 items-center justify-end md:pr-[20px]'>
            <NavLink to="/admin/abonamente" className={buttonClass}>Abonamente</NavLink>
            <NavLink to="/admin/orar" className={buttonClass}>Orar</NavLink>
            <NavLink to="/admin/clienti" className={buttonClass}>Clienti</NavLink>
            <NavLink to="/admin/blog" className={buttonClass}>Blog</NavLink>
            <NavLink to="/admin/galerie" className={buttonClass}>Galerie foto</NavLink>
        </div>
    </div> 
}

export default AdminNavbar;