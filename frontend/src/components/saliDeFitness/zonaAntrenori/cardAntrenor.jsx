import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import { increment } from "../orar/utils";
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

export default function CardAntrenor({ antrenor, display, setDisplay, filteredArray}) {
    const uploadImage = useRef(null);
    const cardRef = useRef(null);
    const [details, setDetails] = useState(false);
    const defaultForm = {
        id: antrenor._id,
        nume: antrenor.nume || '',
        sali: antrenor.sali || '',
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

    const updateArrays = (field, value, index) => {
        const key = Object.keys(form[field][0])[0]; 
        setForm({
            ...form, [field]: form[field].map((item, i) => {
                return index === i ? {[key]: value } : item
            })
        })
    }

    const updateCard = async () => {
        let data = new FormData();
        data.append('id', form.id)
        data.append('nume', form.nume)
        data.append('sali', JSON.stringify(form.sali))
        data.append('functii', JSON.stringify(form.functii))
        data.append('calificari', JSON.stringify(form.calificari))
        data.append('descriere', form.descriere)
        data.append('pozaProfil', form.pozaProfil)
        await axios.put(`${API_URL}/publicPages/antrenori/updateAntrenor`, data, { withCredentials: true })
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(cardRef.current && !cardRef.current.contains(e.target)){
                setDetails(false);
                
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    },  [])


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
                    {form.sali.map((sala, index) => {
                        return <span key={index}> <input onChange={((e) => updateArrays('sali', e.target.value, index))} 
                        type="text" value={sala.sala} placeholder="introdu sala" /> | </span>
                    })}
                    <button onClick={() => setForm({ ...form, sali: [...form.sali, { sala: '' }] })}
                        className="cursor-pointer bg-white text-black p-1"><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={() => updateCard()} className="bg-rose-500 p-2 text-white cursor-pointer">SALVEAZĂ SCHIMBĂRILE</button>
                </div>
                <div className='flex flex-row gap-2 text-gray-400'>
                    {form.functii.map((functie, index) => {
                        return <span key={index}> <input onChange={((e) => updateArrays('functii', e.target.value, index))} type="text" value={functie.functie} placeholder="introdu funcția" /> | </span>
                    })}
                    <button onClick={() => setForm({ ...form, functii: [...form.functii, { functie: '' }] })}
                        className="cursor-pointer bg-white text-black p-1"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <div className='text-white flex flex-col'>
                    {form.calificari.map((calificare, index) => {
                        return <span key={index}><FontAwesomeIcon icon={faChevronRight} /> <input onChange={((e) => updateArrays('calificari', e.target.value, index))} type="text" value={calificare.calificare}
                            className='w-fit' /></span>
                    })}
                    <button onClick={() => setForm({ ...form, calificari: [...form.calificari, { calificare: '' }] })}
                        className="cursor-pointer bg-white text-black p-1 w-fit"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <textarea onChange={(e) => updateForm('descriere', e.target.value)} type="text" name="" id="" value={form.descriere} 
                className="text-white w-full min-h-50" />
            </div>
        </div>
    } else {

        // pentru utilizatori
        return <div ref={cardRef} className={`flex flex-col items-center justify-end gap-5
         md:flex-row animate-fade-in 150 ease-out h-140`}>
            <div className='bg-black text-white md:ring-1 p-2 md:p-5 
            flex flex-col items-center justify-center gap-1 md:gap-5 rounded-md w-fit'>
                <div onClick={() => setDetails(!details)} className="w-50 h-50 md:w-80 md:h-90">
                <img src={`${API_URL}/uploads/POZEPROFIL/ANTRENORI/${antrenor.pozaProfil}`} alt=""
                 className='h-full w-full object-cover rounded-md' />
                </div>
            </div>
            <div className={`w-full md:w-150 overflow opacity-100
             flex flex-col duration-200 ease-out`}>
                <div className='text-[11px] w-full text-gray-400'>
                    {antrenor.functii.map((functie, index) => {
                        return <span key={index}>{functie.functie} | </span>
                    })}
                </div>
                
                <div className='text-[11px] text-white flex flex-col overflow-scroll max-h-30'>
                    {antrenor.calificari.map((calificare, index) => {
                        return <span key={index}><FontAwesomeIcon icon={faChevronRight} /> {calificare.calificare} | </span>
                    })}
                </div>
                <div className="w-full h-[2px] mt-2 mb-2 bg-white rounded-md"></div>
                <p className='text-white text-[11px] md:text-[16px] text-justify'>{antrenor.descriere}</p>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-black w-full justify-between">
                    <button className='active:bg-gray-400 bg-white text-black rounded-md text-[20px] md:text-[30px] cursor-pointer duration-75 ease-out'
                    onClick={() => increment('substract', 'cardAntrenori', display, setDisplay, filteredArray)}><FontAwesomeIcon icon={faAngleLeft}/></button>
                    <h1 className='font-[700] md:text-[25px] text-white'>{antrenor.nume}</h1>
                    <button className='active:bg-gray-400 bg-white text-black rounded-md text-[20px] md:text-[30px] cursor-pointer duration-75 ease-out' 
                    onClick={() => increment('add', 'cardAntrenori', display, setDisplay, filteredArray)}>
            <FontAwesomeIcon icon={faAngleRight}/></button>
                </div>
        </div>
    }
}