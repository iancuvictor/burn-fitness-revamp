import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
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
    const [display, setDisplay] = useState({
        cardAntrenori: 0
    })
    
    async function getData(){
        let response = await axios.get(`${API_URL}/publicPages/antrenori`);
        setData(response.data);
    }

    const increment = (type) => {
        if(type === 'add'){
            if(display.cardAntrenori >= 0 && display.cardAntrenori !== data.length - 1){
                setDisplay({...display, cardAntrenori: display.cardAntrenori + 1})
            } else if(+display.cardAntrenori === data.length - 1){
                setDisplay({...display, cardAntrenori: 0 })
            }
        } else if(type === 'substract'){
            if(display.cardAntrenori > 0){
                setDisplay({...display, cardAntrenori: display.cardAntrenori - 1})
            } else if(display.cardAntrenori === 0){
                setDisplay({...display, cardAntrenori: data.length - 1});
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return <div className='flex flex-col items-center gap-10 w-full'>
        <h1 className='text-white text-[28px] md:text-[30px] font-[700]'>Antrenorii sălii noastre</h1>
        <div className={`${isAdmin ? 'flex-col' : 'flex-row'} flex justify-center items-center gap-5`}>
            <div className='flex items-center gap-5'>
            <button className='bg-white rounded-md text-[30px] cursor-pointer'
            onClick={() => increment('substract')}><FontAwesomeIcon icon={faAngleLeft}/></button>
        {data !== undefined && data.map((antrenor, index) => {
            return display.cardAntrenori === index && <CardAntrenor key={index} antrenor={antrenor}/>
        })}
        <button className='bg-white rounded-md text-[30px] cursor-pointer' 
        onClick={() => increment('add')}>
            <FontAwesomeIcon icon={faAngleRight}/></button>
        </div>
        </div>
    </div>
}