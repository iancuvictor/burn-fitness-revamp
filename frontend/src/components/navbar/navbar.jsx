import { NavLink } from 'react-router';
import BurnLogo from './assets/burnLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBasketShopping, faCircleUser, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useRef, useEffect } from 'react';
import PopUp from '../popUps/popUp';
import defaultImage from '../../media/default-avatar.jpg'

const buttonClass = ({ isActive }) => `${isActive ? 'z-1 text-white underline underline-offset-5' :
    'hover:text-white hover:underline underline-offset-5 duration-150'} 
     w-50 md:w-fit pt-2 pt-2 md:pt-0 md:pb-0 lg:pt-2 lg:pb-2 flex items-center justify-center gap-2`

const profileCheck = ({ isActive }) => `${isActive ? 'text-rose-500' : 'text-white'} text-[28px] md:text-[30px] flex gap-1 items-center justify-center`
const dropdownButtonStyle = ({ isActive }) => `${isActive ? 'text-rose-400' : 'text-white'} text-[16px] pt-1 pb-1`;

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Navbar({ menuState, setMenuState }) {
    const { user, logOut } = useContext(AuthContext);
    const [alert, setAlert] = useState({
        logOut: false,
    });
    const [displayDropDown, setDisplayDropDown] = useState({
        user: false,
        orar: false
    });
    const { isAdmin } = useContext(AuthContext)
    const dropDownMenuUser = useRef(null);
    const dropDownMenuOrar = useRef(null);

    const closeMenu = (setMenuState) => {
        document.body.style.overflow = '';
        setMenuState(false)
    }

    useEffect(() => {
    function handleClickOutsideMenu(e, ref, target) {
        if (ref.current && !ref.current.contains(e.target)) {
            setDisplayDropDown(prev => ({ ...prev, [target]: false }));
        }
    }

    const handleUserClick = (e) => handleClickOutsideMenu(e, dropDownMenuUser, 'user');
    const handleOrarClick = (e) => handleClickOutsideMenu(e, dropDownMenuOrar, 'orar');

    document.addEventListener('mousedown', handleUserClick);
    document.addEventListener('mousedown', handleOrarClick);

    return () => {
        document.removeEventListener('mousedown', handleUserClick);
        document.removeEventListener('mousedown', handleOrarClick);
    };
}, []);

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
            <NavLink to="/" className={buttonClass}>
            <img src={BurnLogo} alt="burn fitness logo" className='w-50 md:w-40 lg:w-50 md:pl-[20px] select-none' />
            </NavLink>
            <div className='hidden md:flex flex-wrap text-gray-500 text-[14px] lg:text-[16px] gap-2.5 xl:gap-5 items-center justify-end md:pr-[20px]'>
                <NavLink to="/" className={buttonClass}>Acasa</NavLink>
                <NavLink to="/abonamente" className={buttonClass}>Abonamente</NavLink>
                <NavLink to="/clase" end className={buttonClass}>Clase</NavLink>
                <div ref={dropDownMenuOrar} className='relative'>
                    <button onClick={() => setDisplayDropDown({...displayDropDown, orar: !displayDropDown.orar})} 
                    className={`${displayDropDown.orar ? 'text-white' : ''} cursor-pointer hover:text-white`}>Orar Clase</button>
                    {displayDropDown.orar &&
                        <div className={`flex flex-col gap-2 absolute top-10 animate-fade-in duration-75 ease-out bg-black 
                                        pb-3 pl-3 pr-3 -mb-3 -ml-3 -mr-3 pt-2 min-w-40 rounded-b-md`}>
                            <NavLink to='/salidefitness/sala-fitness-zorilor#orar' 
                            onClick={() => setDisplayDropDown({...displayDropDown, orar: false})}
                            className={`hover:text-white duration-75 ease-out`}>Orar Zorilor</NavLink>
                            {/* <NavLink to='/salidefitness/sala-fitness-sigma' className={`hover:text-white duration-75 ease-out`}>Orar Sigma</NavLink>
                            <NavLink to='/salidefitness/sala-fitness-manastur' className={`hover:text-white duration-75 ease-out`}>Orar Mănăștur</NavLink>
                            <NavLink to='/salidefitness/sala-fitness-flora' className={`hover:text-white duration-75 ease-out`}>Orar Flora</NavLink>
                            <NavLink to='/salidefitness/sala-fitness-marasti' className={`hover:text-white duration-75 ease-out`}>Orar Mărăști</NavLink> */}
                        </div>}
                </div>
                <NavLink to="/salidefitness" className={buttonClass}>Săli fitness</NavLink>
                <NavLink to="/contact" className={buttonClass}>Contact</NavLink>
                <div className='lg:flex md:hidden'>
                    <a href="https://www.instagram.com/burnfitnesscluj/" target='_blank'><FontAwesomeIcon icon={faInstagramSquare} className='text-[#E06397] hover:text-[#DB2777] duration-150 text-[30px]' /></a>
                    <a href="https://www.facebook.com/BurnFitnessCluj" target='_blank'><FontAwesomeIcon icon={faFacebookSquare} className='text-[#6096D6] hover:text-[#1877F2] duration-150 text-[30px]' /></a>
                </div>
            </div>
            <div ref={dropDownMenuUser} className='relative'>
                <button onClick={() => setDisplayDropDown({...displayDropDown, user: !displayDropDown.user})}
                    className={`${user ? 'w-60' : ''}
                    flex items-center justify-center gap-2 cursor-pointer
                    rounded-md p-2 outline-none`}>
                    {user && <span className='text-white text-[16px]'>Conectat: {user.username}</span>}
                    {user ? <div className='relative h-10 w-10 '>
                        {user.profilePhoto !== undefined ? <img className='rounded-full h-full w-full object-cover object-center' src={`${user.profilePhoto}?t=${Date.now()}`} alt="" />
                        : <img className='rounded-full h-full w-full object-cover object-center' src={defaultImage} alt="" />}
                    </div>
                        : <NavLink to='/profile' className={profileCheck}><FontAwesomeIcon icon={faCircleUser} /></NavLink>}
                </button>
                {user && displayDropDown.user &&
                    <div
                        className={`
                    flex flex-col gap-2 absolute animate-fade-in duration-75 ease-out bg-black 
                    pb-3 pl-3 pr-3 w-60 rounded-b-md`}>
                        <NavLink to='/profile' onClick={() => setDisplayDropDown({...displayDropDown, user: false})} end className={dropdownButtonStyle}>
                            <FontAwesomeIcon icon={faBasketShopping} /> Abonamente/Clase
                        </NavLink>
                        <NavLink to='/profile/setariCont' onClick={() => setDisplayDropDown({...displayDropDown, user: false})} className={dropdownButtonStyle}>
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
            <div className='flex justify-center items-center gap-3'>
                {user !== undefined ? <NavLink to='/profile'
                    className={({ isActive }) => `relative h-8 w-8 rounded-full ${isActive ? 'ring-2 ring-white' : ''}`}>
                    <img className='rounded-full h-full w-full object-cover object-center' src={user.profilePhoto ? `${user.profilePhoto}?t=${Date.now()}` : defaultImage} alt="Profile Picture" />
                </NavLink>
                    : <NavLink to='/profile' className={profileCheck}><FontAwesomeIcon icon={faCircleUser} /></NavLink>}
                <button
                    onClick={() => {
                        document.body.style.overflow = 'hidden';
                        setMenuState(true)
                    }}
                    className={`${menuState ? 'w-10 opacity-0' : 'opacity-100 w-10 md:hidden cursor-pointer text-white'} text-[28px] pr-[50px] duration-100 ease-out`}
                ><FontAwesomeIcon icon={faBars} /></button>
            </div>
            <div id='mobileBurger' className={menuState ? `z-3 animate-fade-in flex flex-col fixed top-0 justify-center 
        items-center w-full h-full bg-black font-finlandica font-bold text-gray-500 text-[25px] md:hidden gap-1` : 'animate-fade-out hidden'}>
                <div onClick={() => closeMenu(setMenuState)} className='fixed z-[-1] h-full w-full'></div>
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
                {/* <NavLink to="/profile" className={buttonClass} onClick={() => closeMenu(setMenuState)}>Cont</NavLink> */}
                <div className='pt-2'>
                    <a href="https://www.instagram.com/burnfitnesscluj/" target='_blank'><FontAwesomeIcon icon={faInstagramSquare} className='text-[#E06397] hover:text-[#DB2777] duration-150 text-4xl' /></a>
                    <a href="https://www.facebook.com/BurnFitnessCluj" target='_blank'><FontAwesomeIcon icon={faFacebookSquare} className='text-[#6096D6] hover:text-[#1877F2] duration-150 text-4xl' /></a>
                </div>
                <button onClick={() => {
                    logOut()
                    closeMenu(setMenuState)}} className='cursor-pointer bg-rose-500 text-white p-1 text-[18px] rounded-xs'>Log out</button>
            </div>
        </div>
    </>
}

export default Navbar;