import { useContext } from "react";
import CardClase from "./cardClase/cardClase";
import {AuthContext} from '../../context/AuthContext';

export default function Clase() {
  const {selectors} = useContext(AuthContext);

  return (
    <div className="flex flex-col justify-center gap-2 items-center pt-5 pb-10 pl-5 pr-5 font-finlandica">
      <h1 className="text-[20px] text-white md:text-[35px] font-[700] pb-3 text-center">CLASE DISPONIBILE</h1>
    <div className={`w-full md:flex flex-row flex-wrap justify-center items-center gap-2 duration-400 ease-out`}>
      {selectors.clase.map((clasa, index) => {
        return <CardClase data={clasa} key={index}/>
      })}
    </div>
        </div>
  );
}