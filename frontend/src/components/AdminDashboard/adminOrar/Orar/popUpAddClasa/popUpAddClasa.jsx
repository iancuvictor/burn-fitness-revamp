import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function PopUpAddClasa({locatie, zi, displayedMenus, setDisplayedMenus, getOrar}) {
    let defaultFormData = {
        ora: '',
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
        denumire: formData.denumire,
        antrenor: formData.antrenor,
        capacitate: +formData.capacitate
    }

    try{
        let response = await axios.post(`${API_URL}/classes/orarClase`, reqBody)
        console.log(response); 
        getOrar(locatie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
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
        <div className="bg-white p-[30px]">

      <h1 className="text-[20px]">Adaugă clasă: <span className="font-[500]">{zi}</span></h1>
      <form action="">
        <div>
        <input onChange={(e) => updateForm('ora', e.target.value)} type="time" name="" id="" placeholder="Ora"/>
        <input onChange={(e) => updateForm('denumire', e.target.value)} type="text" name="" id="" placeholder="Denumire"/>
        <input onChange={(e) => updateForm('antrenor', e.target.value)} type="text" name="" id="" placeholder="Antrenor"/>
        <input onChange={(e) => updateForm('capacitate', e.target.value)} type="text" name="" id="" placeholder="Capacitate"/>
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
            setDisplayedMenus({...displayedMenus, popUpAddClasa: false})
            setFormData(defaultFormData);
        }} className="cursor-pointer p-[10px] rounded-md
        shadow-md hover:shadow-xl duration-150 ease-out">Anulează</button>
        </div>
      </form>
        </div>
    </div>
  );
}

export default PopUpAddClasa;
