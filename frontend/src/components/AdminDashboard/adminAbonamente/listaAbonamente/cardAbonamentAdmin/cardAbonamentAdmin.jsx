import PopUp from "../../../../popUps/popUp";
import { useState } from "react";
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

function CardAbonamentAdmin({ data }) {
  const [alert, setAlert] = useState({
    duplicate: false,
  });
    const duplicateSubscription = async (data) => {
      await axios.post(`${API_URL}/abonamente/adaugaAbonament`, data);
      setAlert({...alert, duplicate: false})
    }

  return <div className="font-finlandica p-[20px] shadow-md bg-white">
    <div className={`${alert.duplicate ? "z-4 fixed top-0 left-0" : "hidden"}`}>
        <PopUp
          type="alert"
          message="Ești sigur că vrei să creezi o clonă a acestui abonament?"
          ifYes={() => duplicateSubscription(data)}
          ifNo={() => setAlert({ ...alert, duplicate: false })}
        />
      </div>
      <div className="flex gap-2">
        <span>Tier</span>
        <input type="text" value={data.tier} />
      </div>
      <div className="flex gap-2">
        <span>Titlu</span>
        <input type="text" value={data.titlu} />
      </div>
      <div className="flex gap-2">
        <span>Descriere</span>
        <input type="text" value={data.desc} />
      </div>
      <div className="flex flex-col gap-2">
        <span>Prețuri</span>
        {data.preturi.map((pret, index) => {
          return (
            <div className="relative w-50 flex items-center justify-center gap-2" key={index}>
              <div className="flex gap-2 w-[40%]">
                <span>Preț</span>
                <input type="text" value={pret.pret} />
              </div>
              <div className="flex gap-2 w-[40%]">
                <span>Durație</span>
                <input type="text" value={pret.duratie} />
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => setAlert({...alert, duplicate: true })} className="cursor-pointer p-[10px] bg-indigo-500 rounded-md ">Duplicate</button>
    </div>
}

export default CardAbonamentAdmin;
