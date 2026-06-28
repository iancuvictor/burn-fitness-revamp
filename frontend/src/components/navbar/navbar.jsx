import { NavLink } from 'react-router';
import BurnLogo from './assets/burnLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCalendarDays, faCircleUser, faDumbbell, faEnvelope, faHouse, faHouseUser, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';

function Navbar({menuState, setMenuState}){
    const { isAdmin } = useContext(AuthContext)
    const buttonClass = ({isActive}) => `${isActive ? 'z-1 text-white underline underline-offset-5' : 'hover:text-white hover:underline underline-offset-5 duration-150'} flex items-center justify-center gap-2`

    return <>
    <div id='navbar' className={`${isAdmin === false ? 'md:flex' : 'hidden'} bg-black/95 z-4 fixed top-0 w-full hidden h-20 gap-5 items-center md:justify-between xl:justify-evenly font-[600]`}>
     {/* <div className="z-[-1] h-full absolute inset-0 bg-gradient-to-b from-black from-0% via-black via-50% to-black via-70% to-transparent to-100%"></div> */}
        <NavLink to="/" className={buttonClass}><img src={BurnLogo} alt="burn fitness logo" className='w-50 md:pl-[20px] select-none'/></NavLink>
        <div className='hidden md:flex flex-wrap text-gray-500 text-[16px] gap-2.5 xl:gap-5 items-center justify-end md:pr-[20px]'>
            <NavLink to="/" className={buttonClass}>Acasa</NavLink>
            <NavLink to="/abonamente" className={buttonClass}>Abonamente</NavLink>
            <NavLink to="/orar-clase" className={buttonClass}>Clase</NavLink>
            <NavLink to="/salidefitness" className={buttonClass}>Săli fitness</NavLink>
            {/* <NavLink to="/blog" className={buttonClass}>Blog</NavLink> */}
            {/* <NavLink to="/galerie" className={buttonClass}>Galerie foto</NavLink> */}
            <NavLink to="/contact" className={buttonClass}>Contact</NavLink>
            <div className='lg:flex md:hidden'>
                <a href="https://www.instagram.com/burnfitnesscluj/" target='_blank'><FontAwesomeIcon icon={faInstagramSquare} className='text-[#E06397] hover:text-[#DB2777] duration-150 text-[30px]'/></a>
                <a href="https://www.facebook.com/BurnFitnessCluj" target='_blank'><FontAwesomeIcon icon={faFacebookSquare} className='text-[#6096D6] hover:text-[#1877F2] duration-150 text-[30px]'/></a>
            </div>
        </div>
        <NavLink to="/profile" className='text-gray-500'><FontAwesomeIcon icon={faCircleUser} className='text-[30px] hover:text-white'/></NavLink>
    </div>

    {/* mobile navbar */}
    <div className={`${isAdmin === false ? 'flex' : 'hidden'} bg-black/95 sticky top-0 w-full h-15 z-4 md:hidden justify-between items-center`}>
        {/* <div className="z-[-1] h-full absolute inset-0 bg-gradient-to-b from-black from-0% via-black via-50% to-black via-70% to-transparent to-100%"></div> */}
    <NavLink to='/'><img src={BurnLogo} alt="burn fitness logo" className='md:hidden w-40 m-[10px]'/></NavLink>
    <div className='justify-center items-center flex gap-3'>
        <NavLink to="/profile" className='text-white'><FontAwesomeIcon icon={faCircleUser} className={`${menuState ? 'opacity-0' :
         'opacity-100'} text-[25px] duration-100 ease-out`}/></NavLink>
        <button 
        onClick={() => setMenuState(!menuState)}
        className={`${menuState ? 'w-10 opacity-0' : 'opacity-100 w-10 md:hidden cursor-pointer text-white'} text-[25px] pr-[50px] duration-100 ease-out`}
        ><FontAwesomeIcon icon={faBars} /></button>
    </div>
    <div id='mobileBurger' className={menuState ? 'z-3 animate-fade-in flex flex-col fixed top-0 justify-center items-center gap-5 w-full h-full bg-black font-finlandica font-bold text-gray-500 text-[25px] md:hidden' : 'animate-fade-out hidden'}>
        <div onClick={() => setMenuState(!menuState)} className='fixed z-[-1] h-full w-full'></div>
        <img src={BurnLogo} alt="burn fitness logo" className='w-40 pb-[20px] box-border' onClick={() => setMenuState(!menuState)}/>
        <NavLink to="/" className={buttonClass} onClick={() => setMenuState(!menuState)}>
        <FontAwesomeIcon icon={faHouse}/> Acasa</NavLink>
        <NavLink to="/abonamente" className={buttonClass} onClick={() => setMenuState(!menuState)}>
        <FontAwesomeIcon icon={faDumbbell}/> Abonamente</NavLink>
        <NavLink to="/orar-clase" className={buttonClass} onClick={() => setMenuState(!menuState)}>
        <FontAwesomeIcon icon={faCalendarDays}/> Clase</NavLink>
        <NavLink to="/salidefitness" className={buttonClass} onClick={() => setMenuState(!menuState)}>
        <FontAwesomeIcon icon={faWeightHanging}/> Săli fitness</NavLink>
        {/* <NavLink to="/blog" className={buttonClass} onClick={() => setMenuState(!menuState)}>Blog</NavLink> */}
        {/* <NavLink to="/galerie" className={buttonClass} onClick={() => setMenuState(!menuState)}>Galerie foto</NavLink> */}
        <NavLink to="/contact" className={buttonClass} onClick={() => setMenuState(!menuState)}>
        <FontAwesomeIcon icon={faEnvelope}/> Contact</NavLink>
        <NavLink to="/profile" className={buttonClass} onClick={() => setMenuState(!menuState)}>
        <FontAwesomeIcon icon={faHouseUser}/>Cont</NavLink>
        <div>
        <a href="https://www.instagram.com/burnfitnesscluj/" target='_blank'><FontAwesomeIcon icon={faInstagramSquare} className='text-[#E06397] hover:text-[#DB2777] duration-150 text-3xl'/></a>
        <a href="https://www.facebook.com/BurnFitnessCluj" target='_blank'><FontAwesomeIcon icon={faFacebookSquare} className='text-[#6096D6] hover:text-[#1877F2] duration-150 text-3xl'/></a>
        </div>
    </div>
    </div>
    </> 
}

export default Navbar;