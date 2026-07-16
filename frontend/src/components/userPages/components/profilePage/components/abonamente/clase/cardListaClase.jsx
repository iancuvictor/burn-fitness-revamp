import axios from "axios";
import { toast } from "sonner";
import {PopUp} from '../../../../../../index';
import { useContext, useState } from "react";
import { AuthContext } from "../../../../../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const API_URL = import.meta.env.VITE_BACKEND_URL

function CardListaClase({clasa}) {
  const{ refreshUser } = useContext(AuthContext);

  const [popUpRenuntaClasa, setPopUpRenuntaClasa] = useState(false);

   const renuntaLaClasa = async (id) => {
    await axios.put(
      `${API_URL}/classes/renuntaLaClasa`,
      { _id: id },
      { withCredentials: true },
    );
    refreshUser();
    setPopUpRenuntaClasa(false);
    toast.success('Ai renunțat cu succes la clasa')
  };

  
  const d = new Date(clasa.date);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ora = `${hh}:${mm}`
  
  return <div
    className="relative flex flex-col gap-2 w-full md:w-fit
    shadow-md p-3 rounded-md font-finlandica ring-2"
  >
    <button onClick={() => setPopUpRenuntaClasa(true)} 
          className="text-[14px] font-[400] hover:bg-gray-200 absolute top-0 right-0 p-3
          text-black cursor-pointer rounded-tr-md">
            <FontAwesomeIcon icon={faX} /></button>

    {popUpRenuntaClasa && 
    <PopUp type='alert' 
    message='Sigur vrei să renunți la clasă?' 
    ifYes={() => renuntaLaClasa(clasa.classId)} 
    ifNo={() => setPopUpRenuntaClasa(false)}/>}

    <div className="flex flex-col items-baseline justify-between">
      <div className="flex flex-col items-baseline justify-between gap-1">
        <h1 className="font-[700] text-[18px] flex flex-col">
          <div className="flex gap-2 items-center">
          <span className="font-[700] text-[18px]">[{clasa.locatie.toUpperCase()}]</span>
          </div>
          <span className="font-[700] text-[16px]">{clasa.className}<span className="font-[500] text-[14px]"> cu {clasa.antrenor}</span></span>
        </h1>
        <span>
          <span className="font-[700]">
            {clasa.zi}
          </span>: {ora} [{new Date(clasa.date).toLocaleDateString()}]
        </span>
      </div>
      <span className="text-[14px]"></span>
    </div>
  </div>;
}

export default CardListaClase;
