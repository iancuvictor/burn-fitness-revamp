import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function AdminOrar() {
  const [dataOrar, setDataOrar] = useState([]);
  const [addClasa, setAddClasa] = useState({
    locatie: "",
    zi: "",
    ora: "",
    denumire: "",
    antrenor: "",
  });

  const updateForm = (field, value) => {
    setAddClasa({ ...addClasa, [field]: value });
  };

  const getOrar = async (locatie) => {
    locatie = locatie
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

      console.log(locatie)
    let response = await axios.get(`${API_URL}/classes/orarClase`, locatie);
    console.log(response.data);
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

  const addClass = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen w-full p-[20px] font-finlandica">
      <div className="flex gap-5">
        <div>
          <div>
            <span>Editează orar sală:</span>
            <select onChange={(e) => getOrar(e.target.value)}>
              {locatii.map((locatie) => {
                return (
                  <option key={locatie} value={locatie}>
                    {locatie}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="shadow-xl p-[20px] rounded-lg">
          <h1>Orar Zorilor</h1>
          <div></div>
        </div>
        {/* <div>
                <h1>Orar Sigma</h1>
            </div>
            <div>
                <h1>Orar Mănăștur</h1>
            </div>
            <div>
                <h1>Orar Flora</h1>
            </div>
            <div>
                <h1>Orar Mărăști</h1>
            </div> */}
        <div>
          <h1>Adaugă clasă</h1>
          <form action="">
            <select name="" id="">
              {zile.map((zi) => {
                return (
                  <option key={zi} value={zi}>
                    {zi}
                  </option>
                );
              })}
            </select>
            <select name="" id="">
              {locatii.map((locatie) => {
                return (
                  <option key={locatie} value={locatie}>
                    {locatie}
                  </option>
                );
              })}
            </select>
            <button className="cursor-pointer" onClick={(e) => addClass(e)}>
              Adaugă clasă
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminOrar;
