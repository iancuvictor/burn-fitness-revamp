import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function PopUpAddClasa({locatie, zi, displayedMenus, setDisplayedMenus, getOrar}) {
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
        ora: formData.ora,
        data: formData.data,
        denumire: formData.denumire,
        antrenor: formData.antrenor,
        capacitate: +formData.capacitate
    }
    try{
      console.log(reqBody);
        let response = await axios.post(`${API_URL}/classes/orarClase`, reqBody)
        console.log(response); 
        getOrar(locatie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        setFormData(defaultFormData);
        setDisplayedMenus({...displayedMenus, popUpAddClasa: false});
    } catch(err) {
        console.log(err);
    }
  };

  const updateForm = (field, value) => {
    setFormData({...formData, [field]: value});
  }

  return (
    <div className="bg-black/80 z-3 fixed top-0 left-0 h-full w-full flex justify-center items-center">
        <div className="w-150 bg-white p-[30px] rounded-md">

      <h1 className="text-[20px]">Adaugă clasă: <span className="font-[500]">{zi}</span></h1>
      <form action="" className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
        <input onChange={(e) => updateForm('ora', e.target.value)} type="time" value={formData.ora} placeholder="Ora"/>
        <input onChange={(e) => updateForm('data', e.target.value)} type="date" value={formData.data} placeholder="Data"/>
        <input onChange={(e) => updateForm('denumire', e.target.value)} type="text" value={formData.denumire} placeholder="Denumire"/>
        <input onChange={(e) => updateForm('antrenor', e.target.value)} type="text" value={formData.antrenor} placeholder="Antrenor"/>
        <input onChange={(e) => updateForm('capacitate', e.target.value)} type="number" value={formData.capacitate} placeholder="Capacitate"/>
        </div>
        <div className="flex justify-between">
        <button disabled={formData.ora !== '' 
        && formData.denumire !== '' 
        && formData.antrenor !== '' 
        && formData.capacitate !== '' ? false : true }
        
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
            setDisplayedMenus({...displayedMenus, popUpAddClasa: false})
        }} className="cursor-pointer p-[10px] rounded-md
        shadow-md hover:shadow-xl duration-150 ease-out">Anulează</button>
        </div>
      </form>
        </div>
    </div>
  );
}

export default PopUpAddClasa;
