import { faCalendar, faLocationDot, faSquarePhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";

function BlockContact(props) {
    return <div className="flex flex-col items-center justify-between gap-2 pl-5 pr-5 pt-3 pb-5 md:w-100 md:h-75 rounded-xl text-[16px] font-finlandica
    ring-4 ring-redishPinkDark bg-black
    text-white">
        <h1 className="text-[22px] font-[700] underline underline-offset-5 underline decoration-3 animate-fade-in duration-150 ease-out">SALĂ {props.locatie.toUpperCase()}</h1>
        <div className="w-full animate-fade-in duration-150 ease-out">
            <h1><FontAwesomeIcon icon={faSquarePhone} className='text-redishPinkDark' /><span className='font-[600]'> Telefon {props.locatie}</span>: <a href={'tel:+4' + props.nrTel}>{props.nrTel}</a></h1>
            <h1><FontAwesomeIcon icon={faLocationDot} className='text-redishPinkDark' /><span className='font-[600]'> Adresă {props.locatie}</span>: {props.adresa}</h1>
            <div className='flex flex-col'>
                <h1 className='font-[600]'><FontAwesomeIcon icon={faCalendar} className='text-redishPinkDark' /> Program:</h1>
                <div className='flex flex-col'>
                    <span>Luni - Vineri: {props.programLuniVineri}</span>
                    <span>Sâmbătă: {props.programSambata}</span>
                    <span>Duminică: {props.programDuminica}</span>
                </div>
            </div>
        </div>
        <div className="flex justify-between gap-2 w-full text-[14px] md:text-[16px]">

        <a href={props.linkAdresa} className="p-2 bg-rose-500 text-white rounded-md w-[70%] text-center">Deschide în Google Maps</a>
        <NavLink to={`/salidefitness/sala-fitness-${props.locatie.toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")}/`} className="p-2 bg-rose-500 text-white rounded-md w-[30%] text-center">Vezi detalii</NavLink>
        </div>
        {/* <iframe src={props.linkAdresa} className='rounded-xl w-full h-[200px]' allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
    </div>
}

export default BlockContact;