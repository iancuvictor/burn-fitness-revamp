import { NavLink } from 'react-router';
import BurnLogo from './assets/burnLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

function Navbar({menuState, setMenuState}){
    const buttonClass = ({isActive}) => isActive ? 'z-1 text-white underline underline-offset-5' : 'hover:text-white hover:underline underline-offset-5 duration-150'

    return <>
    <div id='navbar' className='hidden md:flex h-20 gap-5 bg-black items-center md:justify-between xl:justify-evenly'>
        <img src={BurnLogo} alt="burn fitness logo" className='w-50 md:pl-[20px]'/>
        <div className='hidden md:flex flex-wrap text-gray-500 text-[16px] gap-2.5 xl:gap-5 items-center justify-end md:pr-[20px]'>
        <NavLink to="/" className={buttonClass}>Acasa</NavLink>
        <NavLink to="/abonamente" className={buttonClass}>Abonamente</NavLink>
        <NavLink to="/rezervari" className={buttonClass}>Rezervări online</NavLink>
        <NavLink to="/servicii" className={buttonClass}>Servicii</NavLink>
        <NavLink to="/orar-clase" className={buttonClass}>Orar clase</NavLink>
        <NavLink to="/blog" className={buttonClass}>Blog</NavLink>
        <NavLink to="/galerie" className={buttonClass}>Galerie foto</NavLink>
        <NavLink to="/salidefitness" className={buttonClass}>Săli fitness</NavLink>
        <NavLink to="/contact" className={buttonClass}>Contact</NavLink>
        <div className='lg:flex md:hidden'>
        <a href="https://www.instagram.com/burnfitnesscluj/" target='_blank'><FontAwesomeIcon icon={faInstagramSquare} className='text-[#E06397] hover:text-[#DB2777] duration-150 text-[30px]'/></a>
        <a href="https://www.facebook.com/BurnFitnessCluj" target='_blank'><FontAwesomeIcon icon={faFacebookSquare} className='text-[#6096D6] hover:text-[#1877F2] duration-150 text-[30px]'/></a>
        </div>
        </div>
    </div>

    {/* mobile navbar */}
    <div className='flex justify-between bg-black'>
    <img src={BurnLogo} alt="burn fitness logo" className='md:hidden w-40 m-[10px]'/>
    <button 
    onClick={() => setMenuState(!menuState)}
    className={menuState ? 'hidden' : 'md:hidden cursor-pointer text-white text-[25px] pl-[px] pr-[20px]'}
    ><FontAwesomeIcon icon={faBars} /></button>
    <div id='mobileBurger' className={menuState ? 'animate-fade-in flex flex-col fixed justify-center items-center gap-5 w-full h-full bg-black font-finlandica font-bold text-gray-500 text-[25px] md:hidden' : 'animate-fade-out hidden'}>
        <div onClick={() => setMenuState(!menuState)} className='fixed z-[-1] h-full w-full'></div>
        <img src={BurnLogo} alt="burn fitness logo" className='w-40 pb-[20px] box-border' onClick={() => setMenuState(!menuState)}/>
        <NavLink to="/" className={buttonClass} onClick={() => setMenuState(!menuState)}>Acasa</NavLink>
        <NavLink to="/abonamente" className={buttonClass} onClick={() => setMenuState(!menuState)}>Abonamente</NavLink>
        <NavLink to="/rezervari" className={buttonClass} onClick={() => setMenuState(!menuState)}>Rezervări online</NavLink>
        <NavLink to="/servicii" className={buttonClass} onClick={() => setMenuState(!menuState)}>Servicii</NavLink>
        <NavLink to="/orar-clase" className={buttonClass} onClick={() => setMenuState(!menuState)}>Orar clase</NavLink>
        <NavLink to="/blog" className={buttonClass} onClick={() => setMenuState(!menuState)}>Blog</NavLink>
        <NavLink to="/galerie" className={buttonClass} onClick={() => setMenuState(!menuState)}>Galerie foto</NavLink>
        <NavLink to="/salidefitness" className={buttonClass} onClick={() => setMenuState(!menuState)}>Săli fitness</NavLink>
        <NavLink to="/contact" className={buttonClass} onClick={() => setMenuState(!menuState)}>Contact</NavLink>
        <div>
        <a href="https://www.instagram.com/burnfitnesscluj/" target='_blank'><FontAwesomeIcon icon={faInstagramSquare} className='text-[#E06397] hover:text-[#DB2777] duration-150 text-3xl'/></a>
        <a href="https://www.facebook.com/BurnFitnessCluj" target='_blank'><FontAwesomeIcon icon={faFacebookSquare} className='text-[#6096D6] hover:text-[#1877F2] duration-150 text-3xl'/></a>
        </div>
    </div>
    </div>
    </> 
}

export default Navbar;