import { useEffect, useState } from "react";
import Orar from "./Orar/orar";
import axios from "axios";
import AdaugaAntrenoriClase from "./adaugaAntrenoriClase";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function AdminOrar() {
  const [dataOrar, setDataOrar] = useState([]);
  const [datePagina, setDatePagina] = useState({
    titluOrar: "Zorilor",
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

  let locatii = ["Zorilor", "Sigma", "Mănăștur", "Flora", "Mărăști"];

  useEffect(() => {

    let filtruLocatie = datePagina.titluOrar
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
      getOrar(filtruLocatie);
  }, []);

  return (
    <div className="relative w-full min-h-screen p-5 bg-white flex flex-col gap-5">
      <div className="flex flex-row gap-5">
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
        <div className="flex flex-row gap-5">
          <AdaugaAntrenoriClase type='antrenor'/>
          <AdaugaAntrenoriClase type='clasa'/>
        </div>
      </div>
      <div id="editorWrap">
        <div className="flex flex-col rounded-lg">
          <Orar
            locatie={datePagina.titluOrar}
            dataOrar={dataOrar}
            getOrar={getOrar}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminOrar;
