import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const inputStyle = `p-2 border border-gray-400 text-[14px] w-80%`;
const trashButton = 'cursor-pointer p-2 bg-rose-500 text-white';


export default function MeniuClase() {
    const { selectors, getSelectors } = useContext(AuthContext);
    const [data, setData] = useState({
        nume: '',
        descriere: '',
        imagine: '',
    });
    // const [listaAntrenori, setListaAntrenori] = useState([]);
    const [popUp, setPopUp] = useState(false);

    const createInstance = async () => {
        let sentData = new FormData();
        sentData.append('nume', data.nume)
        sentData.append('descriere', data.descriere)
        sentData.append('imagine', data.imagine)
        await axios.post(`${API_URL}/classes/clasa`, sentData, { withCredentials: true })
        await getSelectors();
        setPopUp(false);
        setData({ ...data, nume: '' });
    }

    const removeInstance = async (id) => {
        console.log('firing');
        await axios.delete(`${API_URL}/classes/clasa`, { data: { _id: id } }, { withCredentials: true })
        await getSelectors();
    }

    return <div className='font-finlandica'>
        <div>
            <button onClick={() => {
                setPopUp(true)
                document.body.style.overflow = 'hidden'
            }}
                className='cursor-pointer p-3 bg-white shadow-md/20 rounded-md'>Gestionează clasele</button>
        </div>
        <div className={`${popUp ? 'flex' : 'hidden'} justify-center items-center
        z-2 fixed top-0 left-0 h-full w-full bg-black/80`}>
            <div className='bg-white p-5 rounded-md flex flex-col gap-5 h-140 overflow-y-scroll'>
                <span className='font-[600]'>Lista clase</span>
                <div className='flex flex-row gap-5'>
                    <div className='flex flex-col gap-2'>
                        <span>Numele clasei:</span>
                        <input onChange={(e) => setData({ ...data, nume: e.target.value })}
                            className='border p-2'
                            type="text" placeholder='Introdu numele clasei'/>
                        <textarea onChange={(e) => setData({ ...data, descriere: e.target.value })}
                        className='border p-2 min-h-50'
                        placeholder='Introdu descrierea clasei (optionala)'></textarea>
                        <input type="file" onChange={(e) => setData({ ...data, imagine: e.target.files[0] })}/>
                        <button onClick={() => createInstance()} 
                        className='cursor-pointer p-3 bg-rose-500 shadow-md/20 rounded-xs'>Adaugă clasă</button>
                            </div>
                        <div className='flex flex-col gap-1 h-100 overflow-y-scroll'>
                            {selectors.clase.map((item, index) => {
                                return <div key={index} className='flex gap-1'>
                                    <input onChange={() => setData()} type="text" name="" id="" value={item.nume} className={inputStyle} />
                                    <button className={trashButton}
                                        onClick={() => removeInstance(item._id)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            })}
                        </div>
                </div>
                        <div className='flex justify-between'>
                            <button onClick={() => createInstance()} className='cursor-pointer p-3 bg-rose-500 shadow-md/20 rounded-xs text-white'>Închide lista</button>
                            <button onClick={() => {
                                setPopUp(false)
                                document.body.style.overflow = ''
                            }} className='cursor-pointer p-3 bg-white shadow-md/20 rounded-xs'>Anulează</button>
                        </div>
            </div>
        </div>
    </div>
}