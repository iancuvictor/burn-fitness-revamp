import { faCalendar, faLocationDot, faSquarePhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BlockContact(props){
    return <div className="flex flex-col gap-5 p-[20px] rounded-xl text-[18px] md:text-[16px] font-finlandica shadow-lg">
        <div>
        <h1><FontAwesomeIcon icon={faSquarePhone} className='text-[#000]'/><span className='font-[600]'>Telefon {props.locatie}</span>: <a href={'tel:+4'+ props.nrTel}>{props.nrTel}</a></h1>
        <h1><FontAwesomeIcon icon={faLocationDot} className='text-[#000]'/><span className='font-[600]'>Adresă {props.locatie}</span>: {props.adresa}</h1>
        <div className='flex flex-col'>
            <h1 className='font-[600]'><FontAwesomeIcon icon={faCalendar} className='text-[#000]'/>Program:</h1>
            <div className='flex flex-col'>
            <span>Luni - Vineri: {props.programLuniVineri}</span>
            <span>Sâmbătă: {props.programSambata}</span>
            <span>Duminică: {props.programDuminica}</span>
            </div>
        </div>
        </div>
        <iframe src={props.linkAdresa} className='w-full h-[200px]' allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
}

export default BlockContact;