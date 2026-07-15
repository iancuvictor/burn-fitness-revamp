import { useContext, useState } from "react";
import CardClase from "./cardClase/cardClase";
import {AuthContext} from '../../context/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MeniuClase from "../AdminDashboard/adminOrar/meniuClase";

export default function Clase() {
  const {selectors, isAdmin} = useContext(AuthContext);
  const [meniuClase, setMeniuClase] = useState(false);

  return (
    <div className="flex flex-col justify-center gap-2 items-center pt-5 pb-10 pl-5 pr-5 font-finlandica">
      <h1 className="text-[20px] text-white md:text-[35px] font-[700] pb-3 text-center">CLASE DISPONIBILE</h1>
    <div className={`w-full md:flex flex-row flex-wrap justify-center items-center gap-2 duration-400 ease-out`}>
      {selectors.clase.map((clasa, index) => {
        return <CardClase data={clasa} key={index}/>
      })}
      {isAdmin && <button onClick={() => setMeniuClase(true)}
      className="cursor-pointer bg-rose-500 w-2xs h-70 p-10 text-[30px]"><FontAwesomeIcon icon={faPlus}/></button>}
      {isAdmin && meniuClase && <MeniuClase setPopUp={setMeniuClase} popUp={meniuClase}/>}
    </div>
        </div>
  );
}