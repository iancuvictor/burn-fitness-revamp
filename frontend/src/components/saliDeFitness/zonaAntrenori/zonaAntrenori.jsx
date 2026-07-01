import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import CardAntrenor from './cardAntrenor';

const API_URL = import.meta.env.VITE_BACKEND_URL

export default function ZonaAntrenori(){
    const {isAdmin} = useContext(AuthContext);
    const [data, setData] = useState();
    
    async function getData(){
        let response = await axios.get(`${API_URL}/publicPages/antrenori`);
        setData(response.data);
    }

    useEffect(() => {
        getData()
    }, [])
    return <div className='flex flex-col items-center gap-10 w-full'>
        <h1 className='text-white text-[28px] md:text-[30px] font-[700]'>Antrenorii sălii noastre</h1>
        <div className='flex flex-col justify-center items-center gap-5'>
        {data !== undefined && data.map((antrenor, index) => {
            return <CardAntrenor key={index} antrenor={antrenor}/>
        })}
        </div>
    </div>
}