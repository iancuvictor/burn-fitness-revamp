import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../../context/AuthContext";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function PopUpAddClasa({ locatie, zi, ziOrar, displayedMenus, setDisplayedMenus, getOrar }) {
  const { selectors } = useContext(AuthContext);
  const parts = ziOrar.split('.');
  let ziOrarParsed = `${parts[2]}-${parts[1]}-${parts[0]}`;

  let defaultFormData = {
    ora: '',
    data: '',
    denumire: '',
    antrenor: '',
    capacitate: ''
  }
  const [formData, setFormData] = useState(defaultFormData);

  const adaugaClasa = async (e) => {
    e.preventDefault();
    let reqBody = {
      locatie: locatie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      zi: zi.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      data: new Date(new Date(ziOrarParsed).setHours(...formData.ora.split(':'))),
      denumire: formData.denumire,
      antrenor: formData.antrenor,
      capacitate: +formData.capacitate
    }
    try {
      let response = await axios.post(`${API_URL}/classes/orarClase`, reqBody)
      console.log(response);
      getOrar(locatie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
      setFormData(defaultFormData);
      setDisplayedMenus({ ...displayedMenus, popUpAddClasa: false });
    } catch (err) {
      console.log(err);
    }
  };

  const updateForm = (field, value) => {
    setFormData({ ...formData, [field]: value });
  }

  return (
    <div className="bg-black/80 z-3 fixed top-0 left-0 h-full w-full flex justify-center items-center">
      <div className="w-150 bg-white p-[30px] rounded-md">
        <h1 className="text-[20px]">Adaugă clasă: <span className="font-[500]">{zi}</span></h1>
        <form action="" className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <input onChange={(e) => updateForm('data', e.target.value)} type="date" defaultValue={ziOrarParsed} />
            <input onChange={(e) => updateForm('ora', e.target.value)} className="border p-2"
              type="time" value={formData.ora} placeholder="Ora" />
            <div className="relative w-full border">
              <input onChange={(e) => updateForm('denumire', e.target.value)} type="text" value={formData.denumire} placeholder="Denumire"
                className="peer w-full p-2" />
              <div className={`hidden peer-focus:flex absolute overflow-auto h-fit w-full z-1 
            bg-white flex-col gap-2 p-2 shadow-lg/20 border`}>
                {selectors.clase.filter((clasa) => clasa.nume.toLowerCase().includes(formData.denumire.toLowerCase())).map((clasa, index) => {
                  return <div key={index} onMouseDown={() => updateForm('denumire', clasa.nume)} className="cursor-pointer">{clasa.nume}</div>
                })}
              </div>
            </div>
            <div className="relative w-full border">
              <input onChange={(e) => updateForm('antrenor', e.target.value)} type="text" value={formData.antrenor} placeholder="Antrenor"
                className="peer w-full p-2" />
              <div className={`hidden peer-focus:flex absolute overflow-auto h-fit w-full bg-white flex-col gap-2 p-2 shadow-lg/20 border`}>
                {selectors.antrenori.filter(
                  (antrenor) => antrenor.numeAntrenor.toLowerCase()
                    .includes(formData.antrenor.toLowerCase())).map((antrenor, index) => {
                      return <div key={index} onMouseDown={() => updateForm('antrenor', antrenor.numeAntrenor)} className="cursor-pointer">{antrenor.numeAntrenor}</div>
                    })}
              </div>
            </div>
            <input onChange={(e) => updateForm('capacitate', e.target.value)}
              type="number" value={formData.capacitate} placeholder="Capacitate"
              className="border p-2" />
          </div>
          <div className="flex justify-between">
            <button disabled={formData.ora !== ''
              && formData.denumire !== ''
              && formData.antrenor !== ''
              && formData.capacitate !== '' ? false : true}

              onClick={(e) => adaugaClasa(e)} className={formData.ora !== ''
                && formData.denumire !== ''
                && formData.antrenor !== ''
                && formData.capacitate !== '' ?
                `cursor-pointer p-[10px] rounded-md 
        bg-[#6E7DFF] hover:bg-[#6E7DFF] hover:text-white 
        duration-150 ease-out`:
                `bg-[#57596E] p-[10px] rounded-md`}>Adaugă clasă</button>
            <button onClick={(e) => {
              e.preventDefault()
              setFormData(defaultFormData);
              setDisplayedMenus({ ...displayedMenus, popUpAddClasa: false })
            }} className="cursor-pointer p-[10px] rounded-md
        shadow-md hover:shadow-xl duration-150 ease-out">Anulează</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopUpAddClasa;
