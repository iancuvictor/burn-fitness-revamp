import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import CardAntrenor from './cardAntrenor';

const API_URL = import.meta.env.VITE_BACKEND_URL

export default function ZonaAntrenori({locatie}){
    const {isAdmin} = useContext(AuthContext);
    const [data, setData] = useState();
    const [display, setDisplay] = useState({
        cardAntrenori: 0
    })
    
    async function getData(){
        let response = await axios.get(`${API_URL}/publicPages/antrenori`);
        setData(response.data);
    }
    
    let filteredArray = data?.filter((antrenor) => antrenor.sali.some((sala) => sala.sala === locatie));

    useEffect(() => {
        getData()
    }, [])
    return <div className='flex flex-col items-center gap-5 w-full'>
        <h1 className='text-white text-[28px] md:text-[30px] font-[700]'>Antrenorii sălii noastre</h1>
        <div className={`${isAdmin ? 'flex-col' : 'flex-row'} flex justify-center items-center gap-5`}>
            <div className='flex items-center gap-5 bg-zinc-900 p-4 rounded-t-xl'>
            {/* <button className='active:bg-gray-400 bg-white rounded-md text-[20px] md:text-[30px] cursor-pointer duration-75 ease-out'
            onClick={() => increment('substract')}><FontAwesomeIcon icon={faAngleLeft}/></button> */}
        {data !== undefined && filteredArray.map((antrenor, index) => {
            return display.cardAntrenori === index && 
            <CardAntrenor key={index} antrenor={antrenor} display={display} setDisplay={setDisplay} filteredArray={filteredArray}/>
        })}
        {/* <button className='active:bg-gray-400 bg-white rounded-md text-[20px] md:text-[30px] cursor-pointer duration-75 ease-out' 
        onClick={() => increment('add')}>
            <FontAwesomeIcon icon={faAngleRight}/></button> */}
        </div>
        </div>
    </div>
}