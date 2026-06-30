import Zi from "./zi";
import { setDateOrar, changeCalendarWeek } from "../../../saliDeFitness/orar/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

function Orar({ locatie, dataOrar, getOrar }) {
  const [dataCalendar, setDataCalendar] = useState(setDateOrar());

  const extindeOrar = async () => {
    let dateArr = []
    for (let date of dataCalendar) {
      dateArr.push(date.toISOString().split('T')[0])
    }
    let response = await axios.post(`${API_URL}/classes/extindeOrarul`, dateArr, { withCredentials: true });
    console.log(response);
  }

  return (
    <div className="flex flex-col font-finlandica bg-white">
      <div className="flex flex-col items-center">
        <span>{dataCalendar[0].toLocaleDateString()} - {dataCalendar[6].toLocaleDateString()}</span>
        <div className="flex justify-center items-center gap-3">
          <button onClick={() => extindeOrar()}
            className="cursor-pointer bg-rose-500 p-2 rounded-md text-white">Clonează orarul pe întreaga lună</button>
          <button onClick={() => changeCalendarWeek('substract', dataCalendar, setDataCalendar)} className="cursor-pointer"><FontAwesomeIcon icon={faSquareCaretLeft} /></button>
          <h2 className="text-[16px] md:text-[20px] font-[700]">ORAR-CLASE</h2>
          <button onClick={() => changeCalendarWeek('add', dataCalendar, setDataCalendar)} className="cursor-pointer"><FontAwesomeIcon icon={faSquareCaretRight} /></button>
        </div>
      </div>
      <div className="relative w-full grid grid-cols-3 p-[20px] gap-4 w-full">
        <Zi zi="Luni" locatie={locatie} ziOrar={dataCalendar[0].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar} />
        <Zi zi="Marți" locatie={locatie} ziOrar={dataCalendar[1].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar} />
        <Zi zi="Miercuri" locatie={locatie} ziOrar={dataCalendar[2].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar} />
        <Zi zi="Joi" locatie={locatie} ziOrar={dataCalendar[3].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar} />
        <Zi zi="Vineri" locatie={locatie} ziOrar={dataCalendar[4].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar} />
        <Zi zi="Sâmbătă" locatie={locatie} ziOrar={dataCalendar[5].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar} />
        <Zi zi="Duminică" locatie={locatie} ziOrar={dataCalendar[6].toLocaleDateString()} dataOrar={dataOrar} getOrar={getOrar} />
      </div>
    </div>
  );
}

export default Orar;
