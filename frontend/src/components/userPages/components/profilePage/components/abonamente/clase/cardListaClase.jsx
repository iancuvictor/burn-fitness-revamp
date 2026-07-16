import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_URL

function CardListaClase({clasa}) {

   const renuntaLaClasa = async (id) => {
    await axios.put(
      `${API_URL}/classes/renuntaLaClasa`,
      { _id: id },
      { withCredentials: true },
    );
    toast.success('Ai renunțat cu succes la clasa')
  };

  
  const d = new Date(clasa.date);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ora = `${hh}:${mm}`
  console.log(clasa.date);
  console.log(d);
  
  return <div
    className="flex flex-col gap-2 w-full md:w-fit
    shadow-md p-5 rounded-md font-finlandica ring-2"
  >
    <div className="flex flex-col items-baseline justify-between">
      <div className="flex flex-col items-baseline justify-between gap-1">
        <h1 className="font-[700] text-[18px] flex flex-col">
          <div className="flex gap-2 items-center">
          <span className="font-[700] text-[18px]">[{clasa.locatie.toUpperCase()}]</span>
          {/* <button className="text-[14px] text-white font-[400] bg-rose-500 p-2 cursor-pointer">Renunță la clasă</button> */}
          </div>
          <span className="font-[700] text-[16px]">{clasa.className}<span className="font-[500] text-[14px]"> cu {clasa.antrenor}</span></span>
        </h1>
        <span>
          {clasa.zi}: {ora} [{new Date(clasa.date).toLocaleDateString()}]
        </span>
      </div>
      <span className="text-[14px]"></span>
    </div>
  </div>;
}

export default CardListaClase;
