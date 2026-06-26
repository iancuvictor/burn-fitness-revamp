import { useEffect, useState } from "react";
import axios from "axios";
import ZiOrar from "../orar/ziOrar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";

// calendar functions
import { changeCalendarWeek, setDateOrar } from "../orar/utils";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function SalaFitnessZorilor() {
  const [dataOrar, setDataOrar] = useState([]);
  const [dateCalendar, setDateCalendar] = useState(setDateOrar());

  async function getOrar() {
    let response = await axios.get(
      `${API_URL}/classes/orarClase?locatie=zorilor`,
    );
    // console.log(response.data);
    setDataOrar(response.data);
  }
  useEffect(() => {

    getOrar();
  }, []);

  return (
    <div className="h-fit flex flex-col items-center font-finlandica pb-[50px]">
      <h1 className="text-[20px] md:text-[35px] font-[700] pb-[20px] pt-[30px] text-center">
        Sala fitness ZORILOR
      </h1>
      <div id='orar' className="h-fit flex flex-col items-center shadow-xl p-[25px] rounded-xl bg-white gap-5">
        <div className="flex flex-col items-center">
        <span>{dateCalendar[0].toLocaleDateString()} - {dateCalendar[6].toLocaleDateString()}</span>
        <div className="flex justify-center items-center gap-3">
          <button onClick={() => changeCalendarWeek('substract', dateCalendar, setDateCalendar)} className="cursor-pointer"><FontAwesomeIcon icon={faSquareCaretLeft}/></button>
        <h2 className="text-[16px] md:text-[20px] font-[700]">ORAR-CLASE</h2>
        <button onClick={() => changeCalendarWeek('add', dateCalendar, setDateCalendar)} className="cursor-pointer"><FontAwesomeIcon icon={faSquareCaretRight}/></button>
        </div>
        </div>
        <div className="h-fit flex flex-col md:grid md:grid-cols-4 gap-5">
          <ZiOrar dataOrar={dataOrar} zi="Luni" data={dateCalendar[0].toLocaleDateString()} getOrar={getOrar}/>
          <ZiOrar dataOrar={dataOrar} zi="Marți" data={dateCalendar[1].toLocaleDateString()}  getOrar={getOrar}/>
          <ZiOrar dataOrar={dataOrar} zi="Miercuri" data={dateCalendar[2].toLocaleDateString()}  getOrar={getOrar}/>
          <ZiOrar dataOrar={dataOrar} zi="Joi" data={dateCalendar[3].toLocaleDateString()}  getOrar={getOrar}/>
          <ZiOrar dataOrar={dataOrar} zi="Vineri" data={dateCalendar[4].toLocaleDateString()}  getOrar={getOrar}/>
          <ZiOrar dataOrar={dataOrar} zi="Sâmbătă" data={dateCalendar[5].toLocaleDateString()}  getOrar={getOrar}/>
          <ZiOrar dataOrar={dataOrar} zi="Duminică" data={dateCalendar[6].toLocaleDateString()}  getOrar={getOrar}/>
        </div>
      </div>
    </div>
  );
}

export default SalaFitnessZorilor;
