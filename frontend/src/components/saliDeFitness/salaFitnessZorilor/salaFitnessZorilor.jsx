import { useEffect, useState } from "react";
import axios from "axios";
import ZiOrar from "../orar/ziOrar";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function SalaFitnessZorilor() {
  const [dataOrar, setDataOrar] = useState([]);

  useEffect(() => {
    async function getOrar() {
      let response = await axios.get(
        `${API_URL}/classes/orarClase?locatie=zorilor`,
      );
      console.log(response.data);
      setDataOrar(response.data);
    }

    getOrar();
  }, []);

  return (
    <div className="h-fit flex flex-col items-center font-finlandica pb-[50px]">
      <h1 className="text-[20px] md:text-[35px] font-[700] pb-[20px] pt-[30px] text-center">
        Sala fitness ZORILOR
      </h1>
      <div id='orar' className="h-fit flex flex-col items-center shadow-xl p-[25px] rounded-xl bg-white gap-5">
        <h2 className="text-[16px] md:text-[20px] font-[700]">ORAR-CLASE</h2>
        <div className="h-fit flex flex-col md:grid md:grid-cols-4 gap-5">
          <ZiOrar dataOrar={dataOrar} zi="Luni" />
          <ZiOrar dataOrar={dataOrar} zi="Marți" />
          <ZiOrar dataOrar={dataOrar} zi="Miercuri" />
          <ZiOrar dataOrar={dataOrar} zi="Joi" />
          <ZiOrar dataOrar={dataOrar} zi="Vineri" />
          <ZiOrar dataOrar={dataOrar} zi="Sâmbătă" />
          <ZiOrar dataOrar={dataOrar} zi="Duminică" />
        </div>
      </div>
    </div>
  );
}

export default SalaFitnessZorilor;
