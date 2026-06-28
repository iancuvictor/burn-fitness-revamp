import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function CardClasaOrar({ clasa, getOrar }) {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({
    dejaInscris: false,
    classFull: false,
    noAerobic: '',
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
    await axios.put(
      `${API_URL}/classes/renuntaLaClasa`,
      { _id: id },
      { withCredentials: true },
    );
    // console.log(response);
    getOrar();
    setErrors({ ...errors, dejaInscris: false });
  };

  useState(() => {
    if (user !== undefined) {
      function checkAvailability() {
        if (user.activeSubscriptions.some((subscription) => subscription.subscriptionName.toLowerCase().includes('aerobic'))) {
          setErrors({ ...errors, noAerobic: false });
          if (user.activeClasses.some((cls) => cls.classId === clasa._id)) {
            setErrors({ ...errors, dejaInscris: true });
          } else if (clasa.inscrisi.length === clasa.capacitate) {
            setErrors({ ...errors, classFull: true });
          }
        } else {
          setErrors({ ...errors, noAerobic: true });
        }
      }
      checkAvailability();
    } else {
      setErrors({ ...errors, noAerobic: true });
    }
    getOrar();
  }, []);

  return (
    <div className="font-finlandica flex flex-col gap-1 text-[12px] md:text-[14px] ring-1 p-2 rounded-xs">
      <div className="flex justify-between items-center gap-2">
        <div className="flex md:flex-row flex-wrap gap-1">
          <span>[{clasa.ora}]</span>
          <span className="font-[600] underline underline-offset-2">{clasa.denumire}</span>
          <span className="text-rose-500 font-[600]">{clasa.antrenor}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <span className={`${errors.noAerobic ? 'block' : 'hidden'}`}>{clasa.inscrisi.length} / {clasa.capacitate}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${errors.noAerobic ? 'w-full' : 'w-[60%]'} md:w-65 h-2 bg-gray-200 rounded`}>
            <div
              className="h-full bg-[#6E7DFF] rounded"
              style={{
                width: `${(clasa.inscrisi.length / clasa.capacitate) * 100}%`,
              }}
            />
          </div>
          <button
            onClick={
              errors.dejaInscris
                ? () => renuntaLaClasa(clasa._id)
                : () => inscriereClasa(clasa._id)
            }

            disabled={errors.noAerobic}

            className={`${errors.noAerobic || user === undefined ? 'hidden' : 'block'} 
          ${errors.dejaInscris || errors.classFull ? "bg-gray-700" : "bg-rose-500"} 
          w-[40%] md:w-35 text-[13px] cursor-pointer rounded-xs text-white p-1`}
          >
            {errors.dejaInscris
              ? "Renunță"
              : `Înscrie-te ${clasa.inscrisi.length} / ${clasa.capacitate}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardClasaOrar;
