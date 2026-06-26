import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { has2DTranslate } from "framer-motion";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function CardClasaOrar({ clasa, getOrar }) {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({
    dejaInscris: false,
    classFull: false,
    noAerobic: true,
  });

  const inscriereClasa = async (id) => {
    let response = await axios.post(
      `${API_URL}/classes/signUpClasa`,
      { _id: id },
      { withCredentials: true },
    );
    if (response.data.message !== "classFull") {
      getOrar();
      setErrors({ ...errors, dejaInscris: true });
    } else {
      setErrors({ ...errors, classFull: true });
    }
  };

  const renuntaLaClasa = async (id) => {
    let response = await axios.put(
      `${API_URL}/classes/renuntaLaClasa`,
      { _id: id },
      { withCredentials: true },
    );
    console.log(response);
    getOrar();
    setErrors({ ...errors, dejaInscris: false });
  };
  
  useState(() => {
    if(user !== undefined){
        function checkAvailability() {
            if(user.activeSubscriptions.some((subscription) => subscription.subscriptionName.toLowerCase().includes('aerobic'))){
                setErrors({...errors, noAerobic: false});
                if (user.activeClasses.some((cls) => cls.classId === clasa._id)) {
                    setErrors({ ...errors, dejaInscris: true });
                } else if (clasa.inscrisi.length === clasa.capacitate) {
                    setErrors({ ...errors, classFull: true });
                }
            }
        }
        checkAvailability();
    }
    getOrar();
  }, []);

  //   console.log(clasa._id)

  return (
    <div className="flex flex-col gap-1 text-[12px] md:text-[14px]">
      <div className="flex items-center gap-2">
        <span>{clasa.ora}</span>
        <span>{clasa.denumire}</span>
        <span>{clasa.antrenor}</span>
        <button
          onClick={
            errors.dejaInscris
              ? () => renuntaLaClasa(clasa._id)
              : () => inscriereClasa(clasa._id)
          }

          disabled={errors.noAerobic}

          className={`${user === undefined || errors.noAerobic ? 'hidden' : 'block'} 
          ${errors.dejaInscris || errors.classFull ? "bg-gray-700" : "bg-rose-500"} cursor-pointer rounded-xs text-white p-2`}
        >
          {errors.dejaInscris
            ? "Renunță"
              : "Înscrie-te"}
        </button>
      </div>
        <span className={`${errors.noAerobic ? 'block' : 'hidden'} text-red-500`}>Ai nevoie de abonament AEROBIC pentru a te înscrie</span>
      <div className="flex flex-col">
        <div>
          <span>
            {clasa.inscrisi.length} / {clasa.capacitate}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-full bg-[#6E7DFF] rounded"
            style={{
              width: `${(clasa.inscrisi.length / clasa.capacitate) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CardClasaOrar;
