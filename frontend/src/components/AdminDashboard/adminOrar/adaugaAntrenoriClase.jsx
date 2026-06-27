import axios from 'axios';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_BACKEND_URL;


function AdaugaAntrenoriClase({type}){
    const [data, setData] = useState({
        nume: '',
    });
    const [popUp, setPopUp] = useState(false);

    const createInstance = async (type) => {
        if(type === 'antrenor'){
            await axios.post(`${API_URL}/classes/${type}`, {numeAntrenor: data.nume}, {withCredentials: true})
        } else {
            await axios.post(`${API_URL}/classes/${type}`, {numeClasa: data.nume}, {withCredentials: true})
        }
        setPopUp(false);
        setData({...data, nume: ''});
    }

    return <div className='font-finlandica'>
        <div>
        <button onClick={() => setPopUp(true)} 
        className='cursor-pointer p-3 bg-white shadow-md/20 rounded-md'>Adaugă {type}</button>
        </div>
        <div className={`${popUp ? 'flex' : 'hidden'} justify-center items-center
        z-2 fixed top-0 left-0 h-full w-full bg-black/80`}>
            <div className='bg-white p-5 rounded-md flex flex-col gap-5'>
            <span>Introdu numele {type === 'antrenor' ? 'antrenorului' : 'clasei'}</span>
            <input onChange={(e) => setData({...data, nume: e.target.value})} 
            className='border p-2'
            type="text" name="" id="" value={data.nume}/>
            <div className='flex gap-10'>

        <button onClick={() => createInstance(type)} className='cursor-pointer p-3 bg-rose-500 shadow-md/20 rounded-xs'>Adaugă {type}</button>
        <button onClick={() => setPopUp(false)} className='cursor-pointer p-3 bg-white shadow-md/20 rounded-xs'>Anulează</button>
            </div>
            </div>
        </div>
    </div>
}

export default AdaugaAntrenoriClase;