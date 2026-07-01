import { faCalendar, faLocationDot, faSquarePhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BlockContact(props){
    return <div className="flex flex-col items-center gap-2 pl-5 pr-5 pt-3 pb-5 md:w-100 md:h-110 rounded-xl text-[16px] font-finlandica
    ring-4 ring-redishPinkDark bg-black
    text-white">
            <h1 className="text-[22px] font-[700] underline underline-offset-5 underline decoration-3">SALĂ {props.locatie.toUpperCase()}</h1>
        <div className="w-full">
        <h1><FontAwesomeIcon icon={faSquarePhone} className='text-redishPinkDark'/><span className='font-[600]'> Telefon {props.locatie}</span>: <a href={'tel:+4'+ props.nrTel}>{props.nrTel}</a></h1>
        <h1><FontAwesomeIcon icon={faLocationDot} className='text-redishPinkDark'/><span className='font-[600]'> Adresă {props.locatie}</span>: {props.adresa}</h1>
        <div className='flex flex-col'>
            <h1 className='font-[600]'><FontAwesomeIcon icon={faCalendar} className='text-redishPinkDark'/> Program:</h1>
            <div className='flex flex-col'>
            <span>Luni - Vineri: {props.programLuniVineri}</span>
            <span>Sâmbătă: {props.programSambata}</span>
            <span>Duminică: {props.programDuminica}</span>
            </div>
        </div>
        </div>
        <iframe src={props.linkAdresa} className='rounded-xl w-full h-[200px]' allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
}

export default BlockContact;