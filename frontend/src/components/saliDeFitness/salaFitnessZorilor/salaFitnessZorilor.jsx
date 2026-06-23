import { useEffect, useState } from "react";
import axios from "axios";
import ZiOrar from "../orar/ziOrar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function SalaFitnessZorilor() {
  const [dataOrar, setDataOrar] = useState([]);
  const [dateCalendar, setDateCalendar] = useState(setDateOrar());

  useEffect(() => {
    async function getOrar() {
      let response = await axios.get(
        `${API_URL}/classes/orarClase?locatie=zorilor`,
      );
      // console.log(response.data);
      setDataOrar(response.data);
    }

    getOrar();
  }, []);
  
  
  function setDateOrar(){
    let monday = new Date();
    let difference = monday.getDay() - 1
    monday.setDate(monday.getDate() - difference);
    
    let dateArray = [];
  for(let i = 0; i < 7; i++){
    let newDate = new Date(monday);
    dateArray.push(new Date((newDate).setDate((newDate.getDate() + i))));
  }
  return dateArray
  }

  // useEffect(() => {
  //   setDateOrar();
  // }, [])


  function changeCalendarWeek(type){
    if(type === 'add'){
      let newArray = dateCalendar.map((date) => {
        return new Date(new Date(date).setDate(new Date(date).getDate() + 7));
      })
      setDateCalendar(newArray);
    } else if(type === 'substract'){
      let newArray = dateCalendar.map((date) => {
        return new Date(new Date(date).setDate(new Date(date).getDate() - 7));
      })
      setDateCalendar(newArray);
    }
  }

  return (
    <div className="h-fit flex flex-col items-center font-finlandica pb-[50px]">
      <h1 className="text-[20px] md:text-[35px] font-[700] pb-[20px] pt-[30px] text-center">
        Sala fitness ZORILOR
      </h1>
      <div id='orar' className="h-fit flex flex-col items-center shadow-xl p-[25px] rounded-xl bg-white gap-5">
        <div className="flex flex-col items-center">
        <span>{dateCalendar[0].toLocaleDateString()} - {dateCalendar[6].toLocaleDateString()}</span>
        <div className="flex justify-center items-center gap-3">
          <button onClick={() => changeCalendarWeek('substract')} className="cursor-pointer"><FontAwesomeIcon icon={faSquareCaretLeft}/></button>
        <h2 className="text-[16px] md:text-[20px] font-[700]">ORAR-CLASE</h2>
        <button onClick={() => changeCalendarWeek('add')} className="cursor-pointer"><FontAwesomeIcon icon={faSquareCaretRight}/></button>
        </div>
        </div>
        <div className="h-fit flex flex-col md:grid md:grid-cols-4 gap-5">
          <ZiOrar dataOrar={dataOrar} zi="Luni" data={dateCalendar[0].toLocaleDateString()}/>
          <ZiOrar dataOrar={dataOrar} zi="Marți" data={dateCalendar[1].toLocaleDateString()}/>
          <ZiOrar dataOrar={dataOrar} zi="Miercuri" data={dateCalendar[2].toLocaleDateString()}/>
          <ZiOrar dataOrar={dataOrar} zi="Joi" data={dateCalendar[3].toLocaleDateString()}/>
          <ZiOrar dataOrar={dataOrar} zi="Vineri" data={dateCalendar[4].toLocaleDateString()}/>
          <ZiOrar dataOrar={dataOrar} zi="Sâmbătă" data={dateCalendar[5].toLocaleDateString()}/>
          <ZiOrar dataOrar={dataOrar} zi="Duminică" data={dateCalendar[6].toLocaleDateString()}/>
        </div>
      </div>
    </div>
  );
}

export default SalaFitnessZorilor;
