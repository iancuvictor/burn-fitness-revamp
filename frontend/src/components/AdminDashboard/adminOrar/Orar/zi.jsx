import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopUpAddClasa from './popUpAddClasa/popUpAddClasa';
import { faCalendarPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Zi({locatie, dataOrar, zi, getOrar}) {
    const [displayedMenus, setDisplayedMenus] = useState({
        popUpAddClasa: false,
    })

    const locatieAjustata = locatie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    const removeClass = async (clasa) => {
        await axios.delete(`${API_URL}/classes/orarClase`, { data: clasa });
        getOrar(locatieAjustata);
    }

    const addClass = () => {
        setDisplayedMenus({...displayedMenus, popUpAddClasa: true});
    }

    let ziCheck = zi.toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

  return (
    <div className="flex flex-col h-fit pr-[20px] font-finlandica gap-5">
        <div className={`${displayedMenus.popUpAddClasa ? 'flex' : 'hidden'} fixed`}>
        <PopUpAddClasa locatie={locatie} zi={zi} displayedMenus={displayedMenus} setDisplayedMenus={setDisplayedMenus} getOrar={getOrar}/>
        </div>
        <div className='flex items-center gap-3'>
      <h1 className='text-[20px] font-[500]'>{zi}</h1>
      <button onClick={() => addClass(zi)} className="flex items-center justify-center pt-[5px] pb-[5px] w-10 text-[18px] shadow-md hover:shadow-xl cursor-pointer 
      bg-[#6E7DFF] hover:bg-[#6E7DFF] md:hover:text-white rounded-md duration-150 ease-out"><FontAwesomeIcon icon={faCalendarPlus}/></button>
        </div>
      <div className='flex flex-col gap-1'>
        {dataOrar.map((clasa, index) => {
          if (clasa.zi === ziCheck) {
            return (
              <div key={index} className="flex w-full gap-2 text-[16px]">
                <span className="w-[20%]">{clasa.ora}</span>
                <span className="w-[40%]">{clasa.denumire}</span>
                <span className="w-[30%]">{clasa.antrenor}</span>
                <button onClick={() => removeClass(clasa)} className="w-[10%] shadow-md hover:shadow-xl cursor-pointer bg-[#F06E87]
                hover:bg-[#DE264B] md:hover:text-white pt-[2px] pb-[2px] rounded-md duration-150 ease-out"><FontAwesomeIcon icon={faTrashCan}/></button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Zi;
