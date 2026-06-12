import { useEffect, useState } from "react";
import Orar from "./Orar/orar";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function AdminOrar() {
  const [dataOrar, setDataOrar] = useState([]);
  const [datePagina, setDatePagina] = useState({
    titluOrar: "Zorilor"
  });

  const getOrar = async (identifier) => {
    identifier = identifier
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    let response = await axios.get(
      `${API_URL}/classes/orarClase?locatie=${identifier}`,
    );
    setDataOrar(response.data);
  };

  let zile = [
    "Luni",
    "Marți",
    "Miercuri",
    "Joi",
    "Vineri",
    "Sâmbătă",
    "Duminică",
  ];
  let locatii = ["Zorilor", "Sigma", "Mănăștur", "Flora", "Mărăști"];

  let clase = [
    'Fitness and BodyBuilding',
    'Cycling',
    'Fitball',
    'Interval Training',
    'Burn and Pump',
    'Step Dance Basic',
    'Zumba Fitness',
    'BODYART',
    'Pilates',
    'Toning',
    'Capoeira pentru copii',
    'TRX',
    'Abdomen, Fese, Coapse',
  ];

  useEffect(() => {
    let filtruLocatie = datePagina.titluOrar
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    getOrar(filtruLocatie);
  }, []);
  return <div className="min-h-screen p-[20px] font-finlandica">
      <div className="relative flex flex-col w-full gap-5">
        <div className="flex flex-col w-50">
          <span>Editează orar sală:</span>
          <select
            onChange={(e) => {
              getOrar(e.target.value);
              setDatePagina({ ...datePagina, titluOrar: e.target.value });
            }}
          >
            {locatii.map((locatie) => {
              return (
                <option key={locatie} value={locatie}>
                  {locatie}
                </option>
              );
            })}
          </select>
        </div>
        <div id="w-full editorWrap flex ">
          <div className="w-250 flex flex-col rounded-lg">
            <Orar locatie={datePagina.titluOrar} dataOrar={dataOrar} getOrar={getOrar} />
          </div>
        </div>
      </div>
    </div>
}

export default AdminOrar;
