import axios from 'axios';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_BACKEND_URL
const inputStyle = `p-2 border border-gray-400`;

export default function PopUpAdaugaAntrenor({adminMenuDisplay, setAdminMenuDisplay}){
    const [formData, setFormData] = useState({
        nume: '',
        functii: [],
        calificari: [],
        descriere: '',
        pozaProfil: '',
    })

    const updateForm = (field, value) => {
        setFormData({...formData, [field]: value})
    }


    const adaugaAntrenor = async () => {
        console.log(formData);
        let data = new FormData();
        data.append('nume', formData.nume)
        data.append('functii', JSON.stringify(formData.functii))
        data.append('calificari', JSON.stringify(formData.calificari))
        data.append('descriere', formData.descriere)
        data.append('pozaProfil', formData.pozaProfil)
        console.log(data);
        await axios.post(`${API_URL}/publicPages/antrenori/adaugaAntrenor`, data, {withCredentials: true});
  }

    return <div className='z-1 h-screen w-full fixed top-0 left-0 flex items-center justify-center bg-black/80'>
        <div className='flex flex-col gap-3 bg-white w-200 h-fit rounded-md p-5'>

        <h1>Adaugă antrenor:</h1>
        <div className='flex flex-col gap-2'>
            <input onChange={(e) => updateForm('nume', e.target.value)} type="text" name="" id="" placeholder='Introdu numele antrenorului' value={formData.nume} className={inputStyle}/>
            <button onClick={() => setFormData({...formData, 'sali': [...formData['sali'], {sala: ''}]})}>Adaugă săli</button>
            <button onClick={() => setFormData({...formData, 'functii': [...formData['functii'], {functie: ''}]})}>Adaugă funcții</button>
            <button onClick={() => setFormData({...formData, 'calificari': [...formData['calificari'], {calificare: ''}]})}>Adaugă calificări</button>
            <textarea onChange={(e) => updateForm('descriere', e.target.value)} name="" id="" placeholder='Descriere'></textarea>
            <input onChange={(e) => updateForm('pozaProfil', e.target.files[0])} type="file" name="" id="" />
        </div>

        <div className='flex gap-10'>
        <button onClick={() => adaugaAntrenor()} className='cursor-pointer p-3 bg-rose-500 text-white shadow-md/20 rounded-md'>Adaugă antrenorul</button>
        <button onClick={() => {
            setAdminMenuDisplay({...adminMenuDisplay, adaugaAntrenor: false})
            document.body.style.overflow = ''}} className='cursor-pointer p-3 shadow-md/20 rounded-md'>Anulează</button>
            </div>
        </div>
    </div>
}