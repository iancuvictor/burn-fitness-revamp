import Zi from "./zi";
import { setDateOrar, changeCalendarWeek } from "../../../saliDeFitness/orar/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_URL

function Orar({ locatie, dataOrar, getOrar }) {
  const [dataCalendar, setDataCalendar] = useState(setDateOrar());


  const extindeOrar = async () => {
    let dateArr = []
    for (let clasa of dataOrar) {
      if (new Date(clasa.data) >= new Date(new Date(dataCalendar[0]).setHours('00', '00'))
        && new Date(clasa.data) <= new Date(new Date(dataCalendar[6]).setHours('00', '00'))){
        dateArr.push(clasa.data);
      }
    }
    try {
      let response = await axios.post(`${API_URL}/classes/extindeOrarul`, dateArr, { withCredentials: true });
      getOrar();
      toast.success(`Orarul a fost extins cu succes! (1 săptămână)`)
      changeCalendarWeek('add', dataCalendar, setDataCalendar)
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(`Orarul are deja clase alocate săptămâna viitoare`)
      }
    }
  }

  return (
    <div className="flex flex-col font-finlandica bg-white">
      <div className="flex flex-col items-center">
        <span>{dataCalendar[0].toLocaleDateString()} - {dataCalendar[6].toLocaleDateString()}</span>
        <div className="flex justify-center items-center gap-3">
          <button onClick={() => extindeOrar()}
            className="cursor-pointer bg-rose-500 p-2 rounded-md text-white text-[14px]"><FontAwesomeIcon icon={faCopy} /> Clonează orarul (1 săptămână)</button>
          <button onClick={() => changeCalendarWeek('substract', dataCalendar, setDataCalendar)} className="cursor-pointer"><FontAwesomeIcon icon={faSquareCaretLeft} /></button>
          <h2 className="text-[16px] md:text-[20px] font-[700]">ORAR-CLASE</h2>
          <button onClick={() => changeCalendarWeek('add', dataCalendar, setDataCalendar)} className="cursor-pointer"><FontAwesomeIcon icon={faSquareCaretRight} /></button>
        </div>
      </div>
      <div className="relative w-full grid md:grid-cols-3 xl:grid-cols-4 p-[20px] gap-4 w-full">
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
