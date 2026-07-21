import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { useLocation } from "react-router";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function CardClasaOrar({ clasa, getOrar, calendarDate }) {
  let location = useLocation();
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({
    dejaInscris: false,
    classFull: false,
    noAerobic: '',
    expired: false,
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
    toast.success('Clasa a fost adăugată')
  };

  const renuntaLaClasa = async (id) => {
    await axios.put(
      `${API_URL}/classes/renuntaLaClasa`,
      { _id: id },
      { withCredentials: true },
    );
    toast.success('Ai renunțat cu succes la clasa')
    getOrar();
    setErrors({ ...errors, dejaInscris: false });
  };

  const d = new Date(clasa.data);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ora = `${hh}:${mm}`;

  useEffect(() => {
    let dateToday = new Date();
    if (new Date(clasa.data) <= dateToday) {
      setErrors(prev => ({ ...prev, expired: true }));
    } else {
      setErrors(prev => ({ ...prev, expired: false }));
    }

    if (user !== undefined) {
      function checkAvailability() {
        if (user.activeSubscriptions.some((subscription) => subscription.subscriptionName.toLowerCase().includes('aerobic'))) {
          setErrors(prev => ({ ...prev, noAerobic: false }));
          if (user.activeClasses.some((cls) => cls.classId === clasa._id)) {
            setErrors(prev => ({ ...prev, dejaInscris: true }));
          } else if (clasa.inscrisi.length === clasa.capacitate) {
            setErrors(prev => ({ ...prev, classFull: true }));
          }
        } else {
          setErrors(prev => ({ ...prev, noAerobic: true }));
        }
      }
      checkAvailability();
    } else {
      setErrors(prev => ({ ...prev, noAerobic: true }));
    }
  }, [calendarDate]);

  return (
    <div className="relative font-finlandica flex flex-col justify-between gap-1 h-fit
    text-[12px] md:text-[14px] ring-1 p-2 rounded-xs w-full">
      <div className={`${errors.expired ? 'flex' : 'hidden'} absolute top-0 left-0 w-full h-full bg-black/80 z-1 
      text-rose-500 font-[700]
      items-center justify-center`}>CLASA A EXPIRAT</div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex md:flex-row flex-wrap gap-1 items-center">
          {location.pathname.split('/')[1] === 'clasa' && <span className="text-[12px] font-[600]">[{clasa.locatie.toUpperCase()}]</span>}
          {location.pathname.split('/')[1] === 'clasa' && <span className="text-[12px] font-[600]">[{clasa.data.split('T')[0]}]</span>}
          <span className="text-[12px]">[{ora}]</span>
          <span className="font-[600] text-[12px] underline underline-offset-2">{clasa.denumire}</span>
          <span className="text-rose-500 text-[12px] font-[600]">{clasa.antrenor}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <span className={`${errors.noAerobic ? 'block' : 'hidden'}`}>{clasa.inscrisi.length} / {clasa.capacitate}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${errors.noAerobic ? 'w-full' : errors.expired ? 'w-full' : 'w-[60%] md:w-65'} h-2 bg-gray-200 rounded`}>
            <div
              className="h-full bg-[#6E7DFF] rounded"
              style={{
                width: `${(clasa.inscrisi.length / clasa.capacitate) * 100}%`,
              }}
            />
          </div>
          {errors.noAerobic === false && user !== undefined && errors.expired === false &&
            <button
              onClick={
                errors.dejaInscris
                  ? () => renuntaLaClasa(clasa._id)
                  : () => inscriereClasa(clasa._id)
              }

              disabled={errors.noAerobic}

              className={`${errors.dejaInscris || errors.classFull ? "bg-gray-700" : "bg-rose-500"} 
          w-[40%] md:w-35 text-[11px] cursor-pointer rounded-xs text-white p-1`}
            >
              {errors.dejaInscris
                ? "Renunță"
                : `Înscrie-te ${clasa.inscrisi.length} / ${clasa.capacitate}`}
            </button>}
        </div>
      </div>
    </div>
  );
}

export default CardClasaOrar;
