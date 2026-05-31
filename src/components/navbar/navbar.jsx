import { NavLink } from 'react-router';
import BurnLogo from './assets/burnLogo.svg';

function Navbar(){
    const buttonClass = ({isActive}) => isActive ? 'text-white underline underline-offset-5' : 'hover:text-white hover:underline underline-offset-5 duration-150'

    return <div id='navbar' className='h-25 bg-black text-gray-500 text-[16px] flex gap-10 items-center justify-center'>
        <img src={BurnLogo} alt="burn fitness logo" class='w-60'/>
        <NavLink to="/" className={buttonClass}>Acasa</NavLink>
        <NavLink to="/abonamente" className={buttonClass}>Abonamente</NavLink>
        <NavLink to="/rezervari" className={buttonClass}>Rezervări online</NavLink>
        <NavLink to="/servicii" className={buttonClass}>Servicii</NavLink>
        <NavLink to="/orar-clase" className={buttonClass}>Orar clase</NavLink>
        <NavLink to="/blog" className={buttonClass}>Blog</NavLink>
        <NavLink to="/galerie" className={buttonClass}>Galerie foto</NavLink>
        <NavLink to="/salidefitness" className={buttonClass}>Săli fitness</NavLink>
        <NavLink to="/contact" className={buttonClass}>Contact</NavLink>
    </div>
}

export default Navbar;