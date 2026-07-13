import { NavLink } from 'react-router';
import BurnLogo from './assets/burnLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBasketShopping, faCircleUser, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useRef, useEffect } from 'react';
import PopUp from '../popUps/popUp';

const buttonClass = ({ isActive }) => `${isActive ? 'z-1 text-white underline underline-offset-5' :
    'hover:text-white hover:underline underline-offset-5 duration-150'} 
     w-50 md:w-fit pt-2 pb-2 flex items-center justify-center gap-2`

const profileCheck = ({ isActive }) => `${isActive ? 'text-rose-500' : 'text-white'} text-[25px] md:text-[30px] flex gap-1 items-center justify-center`
const dropdownButtonStyle = ({ isActive }) => `${isActive ? 'text-rose-400' : 'text-white'} text-[16px] pt-1 pb-1`;

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Navbar({ menuState, setMenuState }) {
    const { user, logOut } = useContext(AuthContext);
    const [alert, setAlert] = useState({
        logOut: false,
    });
    const [displayDropDown, setDisplayDropDown] = useState(false);
    const { isAdmin } = useContext(AuthContext)
    const dropDownMenu = useRef(null);

    const closeMenu = (setMenuState) => {
        document.body.style.overflow = '';
        setMenuState(false)
    }

    useEffect(() => {
        function handleClickOutsideMenu(e) {
            if (dropDownMenu.current && !dropDownMenu.current.contains(e.target)) {
                setDisplayDropDown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutsideMenu);
        return () => document.removeEventListener('mousedown', handleClickOutsideMenu);
    }, [])

    return <>
        <div id='navbar' className={`${isAdmin === false ? 'md:flex' : 'hidden'} 
    bg-black/95 hidden z-4 sticky top-0 w-full h-20 gap-5 items-center md:justify-between xl:pl-10 xl:pr-10 font-[600]`}>
            {/* <div className="z-[-1] h-full absolute inset-0 bg-gradient-to-b from-black from-0% via-black via-50% to-black via-70% to-transparent to-100%"></div> */}
            <div className={`${alert.logOut ? "animate-fade-in duration-500 ease-out z-4 fixed top-0 left-0" : "hidden"}`}>
                <PopUp
                    type="alert"
                    message="Ești sigur că vrei să te deconectezi?"
                    ifYes={() => logOut(alert, setAlert)}
                    ifNo={() => setAlert({ ...alert, logOut: false })}
                />
            </div>
            <NavLink to="/" className={buttonClass}><img src={BurnLogo} alt="burn fitness logo" className='w-50 md:pl-[20px] select-none' /></NavLink>
            <div className='hidden md:flex flex-wrap text-gray-500 text-[16px] gap-2.5 xl:gap-5 items-center justify-end md:pr-[20px]'>
                <NavLink to="/" className={buttonClass}>Acasa</NavLink>
                <NavLink to="/abonamente" className={buttonClass}>Abonamente</NavLink>
                <NavLink to="/clase" end className={buttonClass}>Clase</NavLink>
                <NavLink to="/clase/orar" className={buttonClass}>Orar Clase</NavLink>
                <NavLink to="/salidefitness" className={buttonClass}>Săli fitness</NavLink>
                {/* <NavLink to="/blog" className={buttonClass}>Blog</NavLink> */}
                {/* <NavLink to="/galerie" className={buttonClass}>Galerie foto</NavLink> */}
                <NavLink to="/contact" className={buttonClass}>Contact</NavLink>
                <div className='lg:flex md:hidden'>
                    <a href="https://www.instagram.com/burnfitnesscluj/" target='_blank'><FontAwesomeIcon icon={faInstagramSquare} className='text-[#E06397] hover:text-[#DB2777] duration-150 text-[30px]' /></a>
                    <a href="https://www.facebook.com/BurnFitnessCluj" target='_blank'><FontAwesomeIcon icon={faFacebookSquare} className='text-[#6096D6] hover:text-[#1877F2] duration-150 text-[30px]' /></a>
                </div>
            </div>
            <div ref={dropDownMenu} className='relative'>
                <button onClick={() => setDisplayDropDown(!displayDropDown)}
                    className={`
                    flex items-center justify-center gap-2 cursor-pointer
                    rounded-md p-2 w-60 outline-none`}>
                    <span className='text-white text-[16px]'>Conectat: {user.username}</span>
                    {user !== undefined ? <div className='relative h-10 w-10'>
                        <img className='rounded-full h-full w-full' src={`${API_URL}/uploads/POZEPROFIL/${user.profilePhoto}?t=${Date.now()}`} alt="" />
                    </div>
                        : <span className='text-white text-[30px]'><FontAwesomeIcon icon={faCircleUser} /></span>}
                </button>
                {user !== undefined && displayDropDown &&
                    <div 
                    className={`
                    flex flex-col gap-2 absolute animate-fade-in duration-75 ease-out bg-black 
                    pb-3 pl-3 pr-3 w-60 rounded-b-md`}>
                        <NavLink onClick={() => setDisplayDropDown(false)} to='/profile' end className={dropdownButtonStyle}>
                            <FontAwesomeIcon icon={faBasketShopping} /> Abonamente/Clase
                        </NavLink>
                        <NavLink onClick={() => setDisplayDropDown(false)} to='/profile/setariCont' className={dropdownButtonStyle}>
                            <FontAwesomeIcon icon={faGear} /> Setări cont
                        </NavLink>
                        <button onClick={() => setAlert({ ...alert, logOut: true })}
                            className={`cursor-pointer p-1 text-white bg-rose-500 rounded-md text-[14px] font-[500]
                        hover:bg-rose-600 active:bg-rose-900 duration-75 ease-out`}>
                            Log out <FontAwesomeIcon icon={faRightFromBracket} />
                        </button >
                    </div>}
            </div>
        </div>

        {/* mobile navbar */}
        <div className={`${isAdmin === false ? 'flex' : 'hidden'} bg-black/95 sticky top-0 w-full h-15 z-4 md:hidden justify-between items-center`}>
            <NavLink to='/'><img src={BurnLogo} alt="burn fitness logo" className='md:hidden w-40 m-[10px]' /></NavLink>
            <div className='justify-center items-center flex gap-3'>
                <NavLink to="/profile" className={profileCheck}><FontAwesomeIcon icon={faCircleUser} /></NavLink>
                <button
                    onClick={() => {
                        document.body.style.overflow = 'hidden';
                        setMenuState(true)
                    }}
                    className={`${menuState ? 'w-10 opacity-0' : 'opacity-100 w-10 md:hidden cursor-pointer text-white'} text-[25px] pr-[50px] duration-100 ease-out`}
                ><FontAwesomeIcon icon={faBars} /></button>
            </div>
            <div id='mobileBurger' className={menuState ? `z-3 animate-fade-in flex flex-col fixed top-0 justify-center 
        items-center w-full h-full bg-black font-finlandica font-bold text-gray-500 text-[25px] md:hidden gap-1` : 'animate-fade-out hidden'}>
                <div onClick={() => setMenuState(false)} className='fixed z-[-1] h-full w-full'></div>
                <img src={BurnLogo} alt="burn fitness logo" className='w-40 pb-3 box-border' onClick={() => closeMenu(setMenuState)} />
                <NavLink to="/" className={buttonClass} onClick={() => closeMenu(setMenuState)}>Acasa</NavLink>
                <NavLink to="/abonamente" className={buttonClass} onClick={() => closeMenu(setMenuState)}>Abonamente</NavLink>
                <NavLink to="/clase" end className={buttonClass} onClick={() => closeMenu(setMenuState)}>Clase</NavLink>
                <NavLink to="/clase/orar" className={buttonClass} onClick={() => closeMenu(setMenuState)}>Orar clase</NavLink>
                <NavLink to="/salidefitness" className={buttonClass} onClick={() => closeMenu(setMenuState)}>Săli fitness</NavLink>
                {/* <NavLink to="/blog" className={buttonClass} onClick={() => setMenuState(!menuState)}>Blog</NavLink> */}
                {/* <NavLink to="/galerie" className={buttonClass} onClick={() => setMenuState(!menuState)}>Galerie foto</NavLink> */}
                <NavLink to="/contact" className={buttonClass} onClick={() => closeMenu(setMenuState)}>Contact</NavLink>
                <NavLink to="/profile" className={buttonClass} onClick={() => closeMenu(setMenuState)}>Cont</NavLink>
                <div className='pt-2'>
                    <a href="https://www.instagram.com/burnfitnesscluj/" target='_blank'><FontAwesomeIcon icon={faInstagramSquare} className='text-[#E06397] hover:text-[#DB2777] duration-150 text-4xl' /></a>
                    <a href="https://www.facebook.com/BurnFitnessCluj" target='_blank'><FontAwesomeIcon icon={faFacebookSquare} className='text-[#6096D6] hover:text-[#1877F2] duration-150 text-4xl' /></a>
                </div>
            </div>
        </div>
    </>
}

export default Navbar;