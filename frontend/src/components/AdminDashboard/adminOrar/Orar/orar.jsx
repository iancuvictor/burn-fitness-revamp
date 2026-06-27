import Zi from "./zi";
import { setDateOrar, changeCalendarWeek } from "../../../saliDeFitness/orar/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Orar({ locatie, dataOrar, getOrar }) {
  const [dataCalendar, setDataCalendar] = useState(setDateOrar());

  return (
    <div className="flex flex-col font-finlandica bg-white">
      <div className="flex flex-col items-center">
        <span>{dataCalendar[0].toLocaleDateString()} - {dataCalendar[6].toLocaleDateString()}</span>
        <div className="flex justify-center items-center gap-3">
          <button onClick={() => changeCalendarWeek('substract', dataCalendar, setDataCalendar)} className="cursor-pointer"><FontAwesomeIcon icon={faSquareCaretLeft}/></button>
        <h2 className="text-[16px] md:text-[20px] font-[700]">ORAR-CLASE</h2>
        <button onClick={() => changeCalendarWeek('add', dataCalendar, setDataCalendar)} className="cursor-pointer"><FontAwesomeIcon icon={faSquareCaretRight}/></button>
        </div>
        </div>
      <div className="relative w-full grid grid-cols-3 p-[20px] gap-4 w-full">
        <Zi zi="Luni" locatie={locatie} ziOrar={dataCalendar[0].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Marți" locatie={locatie} ziOrar={dataCalendar[1].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Miercuri" locatie={locatie} ziOrar={dataCalendar[2].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Joi" locatie={locatie} ziOrar={dataCalendar[3].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Vineri" locatie={locatie} ziOrar={dataCalendar[4].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Sâmbătă" locatie={locatie} ziOrar={dataCalendar[5].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Duminică" locatie={locatie} ziOrar={dataCalendar[6].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar}/>
      </div>
    </div>
  );
}

export default Orar;
