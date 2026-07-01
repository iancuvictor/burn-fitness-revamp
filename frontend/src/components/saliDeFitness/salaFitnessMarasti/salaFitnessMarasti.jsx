import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
import CalendarOrar from "../orar/calendarOrar";


export default function SalaFitnessMarasti() {

  return (
    <div className="h-fit flex flex-col items-center font-finlandica pb-[50px]">
      <div className="relative h-fit flex items-center gap-3 pb-5 pt-5">
        <NavLink to='/clase/orar' className="block md:hidden text-white font-[600] justify-self-start ring-1 rounded-xs p-1">
          <FontAwesomeIcon icon={faSquareCaretLeft} /> Înapoi</NavLink>
        <h1 className="text-[20px] md:text-[35px] font-[700] text-center text-white justify-self-center">
          Sala fitness MARAȘTI
        </h1>
      </div>
        <CalendarOrar locatie='marasti'/>
    </div>
  );
}
