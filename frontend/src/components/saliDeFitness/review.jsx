import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Review(){
    return <div className="bg-black ring-2 ring-white text-white font-finlandica">
        <h1 className="text-[24px] font-[700]">NUME PERSOANA</h1>
        <p>un review MINUNAT despre noi!</p>
        <FontAwesomeIcon icon={faStar}/>
    </div>
}