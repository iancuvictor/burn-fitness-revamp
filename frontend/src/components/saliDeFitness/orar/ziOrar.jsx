import axios from "axios";
import { useState, useContext} from "react";
import { AuthContext } from "../../../context/AuthContext";
import CardClasaOrar from "./cardClasaOrar";

const API_URL = import.meta.env.VITE_BACKEND_URL

function ZiOrar({ dataOrar, zi, data, getOrar}) {
  const { user } = useContext(AuthContext);

    let classesArray = [];
    for (let clasa of dataOrar) {
    if (new Date(clasa.data).toLocaleDateString() === data) {
      classesArray.push(clasa);
    }
  }

  return (
    <div className="font-finlandica">
      <h1 className="text-[18px] font-[700]">{zi} <span className="font-[500]">[{data}]</span></h1>
      <div className="flex flex-col gap-2">
        {classesArray.length > 0 ? (
          classesArray.map((clasa, index) => {
            if (classesArray.length > 0) {
              return <CardClasaOrar key={index} clasa={clasa} getOrar={getOrar}/>
            }
          })
        ) : (
          <div className="flex">
            <h1>Nu există nici o clasă programată {zi.toLowerCase()}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ZiOrar;
