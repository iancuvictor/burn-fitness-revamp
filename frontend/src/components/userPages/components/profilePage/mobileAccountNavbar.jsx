import { faBasketShopping, faGear, faQrcode, faRightFromBracket, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";
import { toast } from "sonner";

const buttonStyle = ({isActive}) => `${isActive ? 'text-black bg-white' : 'text-gray-300 bg-black'}
flex items-center justify-center w-[20%] pt-4 pb-4 duration-75 ease-out`

function MobileAccountNavbar({logOut}){
    return <div className="z-1 flex justify-between fixed bottom-0 bg-black w-full text-[20px]">
        <NavLink to='.' end className={buttonStyle}>
            <FontAwesomeIcon icon={faBasketShopping}/>
        </NavLink>
        <NavLink to='metodePlata' className={buttonStyle}>
            <FontAwesomeIcon icon={faWallet}/>
        </NavLink>
        <NavLink to='qrCode' className={buttonStyle}>
            <FontAwesomeIcon icon={faQrcode}/>
        </NavLink>
        <NavLink to='setariCont' className={buttonStyle}>
            <FontAwesomeIcon icon={faGear}/>
        </NavLink>
        <button onClick={logOut} className={`${buttonStyle} bg-rose-500`}>
            <FontAwesomeIcon icon={faRightFromBracket}/>
        </button >
    </div>
}

export default MobileAccountNavbar;