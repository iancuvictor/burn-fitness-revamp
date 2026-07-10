import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const inputStyle = `p-2 border border-gray-400 text-[14px] w-80%`;
const trashButton = 'cursor-pointer p-2 bg-rose-500 text-white';


function AdaugaAntrenoriClase({ type }) {
    const { selectors, getSelectors } = useContext(AuthContext);
    const [data, setData] = useState({
        nume: '',
    });
    // const [listaAntrenori, setListaAntrenori] = useState([]);
    const [popUp, setPopUp] = useState(false);

    const createInstance = async (type) => {
        if (type === 'antrenor') {
            await axios.post(`${API_URL}/classes/${type}`, { numeAntrenor: data.nume }, { withCredentials: true })
        } else {
            await axios.post(`${API_URL}/classes/${type}`, { numeClasa: data.nume }, { withCredentials: true })
        }
        await getSelectors();
        setPopUp(false);
        setData({ ...data, nume: '' });
    }

    const removeInstance = async (type, id) => {
        await axios.delete(`${API_URL}/classes/${type}`, { data: { _id: id } }, { withCredentials: true })
        await getSelectors();
    }


    let lista = type === 'antrenor' ? 'antrenori' : 'clase'
    let nume = type === 'antrenor' ? 'numeAntrenor' : 'numeClasa'

    return <div className='font-finlandica'>
        <div>
            <button onClick={() => {
                setPopUp(true)
                document.body.style.overflow = 'hidden'
            }}
                className='cursor-pointer p-3 bg-white shadow-md/20 rounded-md'>Gestionează {type === 'antrenor' ? 'antrenorii' : 'clasele'}</button>
        </div>
        <div className={`${popUp ? 'flex' : 'hidden'} justify-center items-center
        z-2 fixed top-0 left-0 h-full w-full bg-black/80`}>
            <div className='bg-white p-5 rounded-md flex flex-col gap-5 overflow-y-scroll'>
                <span className='font-[600]'>Lista {type === 'antrenor' ? 'antrenori' : 'clase'}</span>
                <div className='flex flex-row gap-5'>
                    <div className='flex flex-col gap-2'>

                        <span>Introdu numele {type === 'antrenor' ? 'antrenorului' : 'clasei'}</span>
                        <input onChange={(e) => setData({ ...data, nume: e.target.value })}
                            className='border p-2'
                            type="text" name="" id="" value={data.nume} />
                        <button onClick={() => createInstance(type)} className='cursor-pointer p-3 bg-rose-500 shadow-md/20 rounded-xs'>Adaugă {type}</button>
                            </div>
                        <div className='flex flex-col gap-1 h-100 overflow-y-scroll'>
                            {selectors[lista].map((item, index) => {
                                return <div key={index} className='flex gap-1'>
                                    <input onChange={() => setData()} type="text" name="" id="" value={item[nume]} className={inputStyle} />
                                    <button className={trashButton}
                                        onClick={() => removeInstance(type, item._id)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            })}
                        </div>
                </div>
                        <div className='flex justify-between'>
                            <button onClick={() => createInstance(type)} className='cursor-pointer p-3 bg-rose-500 shadow-md/20 rounded-xs text-white'>Închide lista</button>
                            <button onClick={() => {
                                setPopUp(false)
                                document.body.style.overflow = ''
                            }} className='cursor-pointer p-3 bg-white shadow-md/20 rounded-xs'>Anulează</button>
                        </div>
            </div>
        </div>
    </div>
}

export default AdaugaAntrenoriClase;