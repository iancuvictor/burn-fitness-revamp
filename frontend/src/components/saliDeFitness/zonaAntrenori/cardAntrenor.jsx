import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

export default function CardAntrenor({ antrenor }) {
    const uploadImage = useRef(null);
    const defaultForm = {
        id: antrenor._id,
        nume: antrenor.nume || '',
        functii: antrenor.functii || '',
        calificari: antrenor.calificari || '',
        descriere: antrenor.descriere || '',
        pozaProfil: antrenor.pozaProfil || ''
    }
    const [form, setForm] = useState(defaultForm)
    const { isAdmin } = useContext(AuthContext);

    const updateForm = (field, value) => {
        setForm({ ...form, [field]: value });
    }

    const updateFunctii = (value, index) => {
        setForm({
            ...form, functii: form.functii.map((functie, i) => {
                return index === i ? { ...functie, functie: value } : functie
            })
        })
    }

    const updateCalificari = (value, index) => {
        setForm({
            ...form, calificari: form.calificari.map((calificare, i) => {
                return index === i ? { ...calificare, calificare: value } : calificare
            })
        })
    }

    const updateCard = async () => {
        let data = new FormData();
        data.append('id', form.id)
        data.append('nume', form.nume)
        data.append('functii', JSON.stringify(form.functii))
        data.append('calificari', JSON.stringify(form.calificari))
        data.append('descriere', form.descriere)
        data.append('pozaProfil', form.pozaProfil)
        await axios.put(`${API_URL}/publicPages/antrenori/updateAntrenor`, data, { withCredentials: true })
    }

    console.log(form.functii);


    if (isAdmin) {


        // pt admin
        return <div className='flex gap-5 w-full'>
            <div className='bg-white text-black p-5 flex flex-col items-center justify-center gap-5 rounded-md w-fit'>
                <div className="w-xs">
                    <img onClick={() => uploadImage.current.click()} src={`${API_URL}/uploads/POZEPROFIL/ANTRENORI/${form.pozaProfil}`} alt="" className='w-full' />
                    <input ref={uploadImage} onChange={(e) => updateForm('pozaProfil', e.target.files[0])} type="file" className="opacity-0 h-0" />
                </div>
                <input onChange={(e) => updateForm('nume', e.target.value)} type="text" defaultValue={form.nume}
                    className="font-[700] text-[20px] pl-2 pr-2" />
            </div>
            <div className="w-full">
                <div className='flex flex-row gap-2 text-gray-400'>
                    {form.functii.map((functie, index) => {
                        return <span key={index}> <input onChange={((e) => updateFunctii(e.target.value, index))} type="text" value={functie.functie} placeholder="introdu funcția" /> | </span>
                    })}
                    <button onClick={() => setForm({ ...form, functii: [...form.functii, { functie: '' }] })}
                        className="cursor-pointer bg-white text-black p-1"><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={() => updateCard()} className="bg-rose-500 p-2 text-white cursor-pointer">SALVEAZĂ SCHIMBĂRILE</button>
                </div>
                <div className='text-white flex flex-col'>
                    {form.calificari.map((calificare, index) => {
                        return <span key={index}><FontAwesomeIcon icon={faChevronRight} /> <input onChange={((e) => updateCalificari(e.target.value, index))} type="text" value={calificare.calificare}
                            className='w-fit' /></span>
                    })}
                    <button onClick={() => setForm({ ...form, calificari: [...form.calificari, { calificare: '' }] })}
                        className="cursor-pointer bg-white text-black p-1 w-fit"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <textarea onChange={(e) => updateForm('descriere', e.target.value)} type="text" name="" id="" value={form.descriere} className="text-white w-full" />
            </div>
        </div>
    } else {

        // pentru utilizatori
        return <div className='flex gap-5 w-full'>
            <div className='bg-white text-black p-5 flex flex-col items-center justify-center gap-5 rounded-md w-fit'>
                <img src={`${API_URL}/uploads/POZEPROFIL/ANTRENORI/${antrenor.pozaProfil}`} alt="" className='w-xs' />
                <h1 className='font-[700] text-[25px]'>{antrenor.nume}</h1>
            </div>
            <div className="w-full">
                <div className='text-gray-400'>
                    {antrenor.functii.map((functie, index) => {
                        return <span key={index}>{functie.functie} | </span>
                    })}
                    <button onClick={() => setForm({ ...form, functii: [...form.functii, { functie: '' }] })} className="cursor-pointer"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <div className='text-white'>
                    {antrenor.calificari.map((calificare, index) => {
                        return <span key={index}><FontAwesomeIcon icon={faChevronRight} /> {calificare.calificare} | </span>
                    })}
                </div>
                <p className='text-white'>{antrenor.descriere}</p>
            </div>
        </div>
    }
}