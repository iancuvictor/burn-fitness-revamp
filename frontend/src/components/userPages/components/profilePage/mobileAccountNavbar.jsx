import { faBasketShopping, faGear, faRightFromBracket, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const buttonStyle = 'w-[25%] pt-3 pb-3 duration-75 ease-out'

function MobileAccountNavbar({display, setDisplay, logOut}){
    return <div className="z-1 flex justify-between fixed bottom-0 bg-black w-full text-[20px]">
        <button onClick={() => setDisplay('abonamente')} className={`${display === 'abonamente' ? 'text-black bg-white' : 'text-gray-300 bg-black'} ${buttonStyle}`}>
            <FontAwesomeIcon icon={faBasketShopping}/>
        </button>
        <button onClick={() => setDisplay('metodePlata')} className={`${display === 'metodePlata' ? 'text-black bg-white' : 'text-gray-300 bg-black'} ${buttonStyle}`}>
            <FontAwesomeIcon icon={faWallet}/>
        </button>
        <button onClick={() => setDisplay('setariCont')} className={`${display === 'setariCont' ? 'text-black bg-white' : 'text-gray-300 bg-black'} ${buttonStyle}`}>
            <FontAwesomeIcon icon={faGear}/>
        </button>
        <button onClick={logOut} className={`${buttonStyle} bg-rose-500`}>
            <FontAwesomeIcon icon={faRightFromBracket}/>
        </button >
    </div>
}

export default MobileAccountNavbar;