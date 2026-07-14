import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_URL
const inputStyle = `p-2 border border-gray-400 text-[14px] field-sizing-content`;

const buttonStyle = `p-2 w-fit bg-green-600 rounded-xs text-white cursor-pointer text-[16px]`

export default function PopUpAdaugaAntrenor({ adminMenuDisplay, setAdminMenuDisplay }) {
    const defaultForm = {
        nume: '',
        sali: [],
        functii: [],
        calificari: [],
        descriere: '',
        pozaProfil: '',
    }
    const [formData, setFormData] = useState(defaultForm)

    const updateForm = (field, value) => {
        setFormData({ ...formData, [field]: value })
    }

    const updateArray = (field, value, index) => {
        const key = Object.keys(formData[field][0])[0];
        setFormData({
            ...formData, [field]: formData[field].map((item, i) => {
                return index === i ? { [key]: value } : item;
            })
        })
    }

    const adaugaAntrenor = async () => {
        let data = new FormData();
        data.append('nume', formData.nume)
        data.append('functii', JSON.stringify(formData.functii))
        data.append('sali', JSON.stringify(formData.sali))
        data.append('calificari', JSON.stringify(formData.calificari))
        data.append('descriere', formData.descriere)
        data.append('pozaProfil', formData.pozaProfil)
        console.log(data);

        if(JSON.stringify(formData) !== JSON.stringify(defaultForm)){
            try {
                await axios.post(`${API_URL}/publicPages/antrenori/adaugaAntrenor`, data, { withCredentials: true });
                document.body.style.overflow = ''
                setAdminMenuDisplay({ ...adminMenuDisplay, adaugaAntrenor: false })
                toast.success(`Antrenorul cu numele [${formData.nume}] a fost adăugat`)
            } catch (err) {
                console.log(err);
            }
        }
    }


    return <div className='pb-5'>
        <button onClick={() => {
            setAdminMenuDisplay({ ...adminMenuDisplay, adaugaAntrenor: true })
            document.body.style.overflow = 'hidden'
        }} className='bg-rose-500 rounded-md p-3 text-white cursor-pointer'>Adaugă antrenor</button>
        <div className={`${adminMenuDisplay.adaugaAntrenor ? 'fixed' : 'hidden'} 
        z-2 h-screen w-full top-0 left-0 flex items-center justify-center bg-black/80`}>
            <div className='flex flex-col gap-3 bg-white w-200 h-[90%] rounded-md p-5 overflow-y-scroll'>
                <div className='flex flex-col gap-2'>
                    <span className='font-[600]'>Nume:</span>
                    <input onChange={(e) => updateForm('nume', e.target.value)} type="text" name="" id="" 
                    placeholder='Introdu numele antrenorului' value={formData.nume} className={inputStyle} />


                    <span className='font-[600]'>Săli unde antrenorul activează:</span>
                    <div className='flex gap-2 flex-wrap'>
                        {formData.sali.map((sala, index) => {
                            return <div key={index} className='flex gap-1'>
                                <input className={inputStyle}
                                    onChange={(e) => updateArray('sali', e.target.value, index)} type="text" value={sala.sala}
                                    placeholder='Introdu sălile unde antrenorul activează' />
                                <button onClick={() => setFormData({ ...formData, sali: formData.sali.filter((sala, i) => i !== index) })}
                                    className='cursor-pointer p-2 bg-rose-500 text-white'><FontAwesomeIcon icon={faTrash} /></button>
                            </div>

                        })}
                        <button onClick={() => setFormData({ ...formData, 'sali': [...formData['sali'], { sala: '' }] })}
                        className={buttonStyle}><FontAwesomeIcon icon={faSquarePlus}/></button>
                    </div>

                    <span className='font-[600]'>Funcții:</span>
                    <div className='flex gap-2 flex-wrap'>
                        {formData.functii.map((functie, index) => {
                            return <div key={index} className='flex gap-1'>
                                <input className={inputStyle}
                                    onChange={(e) => updateArray('functii', e.target.value, index)} type="text" value={functie.functie}
                                    placeholder='Introdu funcția' />
                                <button onClick={() => 
                                setFormData({ ...formData, functii: formData.functii.filter((functie, i) => i !== index) })}
                                    className='cursor-pointer p-2 bg-rose-500 text-white'><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        })}
                        <button onClick={() => setFormData({ ...formData, 'functii': [...formData['functii'], { functie: '' }] })}
                        className={buttonStyle}><FontAwesomeIcon icon={faSquarePlus}/></button>
                    </div>
                    <span className='font-[600]'>
                        Cursuri și calificări:
                    </span>
                    <div className='flex flex-wrap gap-2'>

                        {formData.calificari.map((calificare, index) => {
                            return <div key={index} className='flex gap-1'>
                            <input className={inputStyle}
                                onChange={(e) => updateArray('calificari', e.target.value, index)} type="text" value={calificare.calificare}
                                placeholder='Introdu calificarea' />
                                <button onClick={() => 
                                setFormData({ ...formData, calificari: formData.calificari.filter((calificare, i) => i !== index) })}
                                    className='cursor-pointer p-2 bg-rose-500 text-white'><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                        })}
                        <button onClick={() => setFormData({ ...formData, 'calificari': [...formData['calificari'], { calificare: '' }] })}
                        className={buttonStyle}><FontAwesomeIcon icon={faSquarePlus}/></button>
                    </div>
                    <span className='font-[600]'>Biografie:</span>
                    <textarea className={inputStyle} onChange={(e) => updateForm('descriere', e.target.value)} name="" id="" placeholder='Descriere'></textarea>
                    <input onChange={(e) => updateForm('pozaProfil', e.target.files[0])} type="file" name="" id="" />
                </div>

                <div className='flex gap-10'>
                    <button onClick={() => adaugaAntrenor()} className='cursor-pointer p-3 bg-rose-500 text-white shadow-md/20 rounded-md'>Adaugă antrenorul</button>
                    <button onClick={() => {
                        setAdminMenuDisplay({ ...adminMenuDisplay, adaugaAntrenor: false })
                        document.body.style.overflow = ''
                    }} className='cursor-pointer p-3 shadow-md/20 rounded-md'>Anulează</button>
                </div>
            </div>
        </div>
    </div>
}