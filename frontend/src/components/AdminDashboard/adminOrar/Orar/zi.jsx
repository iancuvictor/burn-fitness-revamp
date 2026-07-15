import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopUpAddClasa from './popUpAddClasa/popUpAddClasa';
import { faCalendarPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Zi({locatie, dataOrar, zi, ziOrar, getOrar, selectors}) {
  const {getSelectors} = useContext(AuthContext);
    const [displayedMenus, setDisplayedMenus] = useState({
        popUpAddClasa: false,
    })

    const locatieAjustata = locatie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    const removeClass = async (clasa) => {
        await axios.delete(`${API_URL}/classes/orarClase`, { data: clasa });
        getOrar(locatieAjustata);
    }

  return <div className="w-full flex flex-col min-h-100 p-[20px] font-finlandica gap-5 shadow-xl">
        <div className={`${displayedMenus.popUpAddClasa ? 'flex' : 'hidden'} fixed`}>
        <PopUpAddClasa selectors={selectors} locatie={locatie} zi={zi} ziOrar={ziOrar} displayedMenus={displayedMenus} setDisplayedMenus={setDisplayedMenus} getOrar={getOrar}/>
        </div>
        <div className='flex items-center gap-3'>
      <h1 className='text-[20px] font-[500]'>{zi} {ziOrar.split('.')[0]}</h1>
      <button onClick={() =>{ 
        getSelectors()
        setDisplayedMenus({...displayedMenus, popUpAddClasa: true})}} className="flex items-center justify-center pt-[5px] pb-[5px] w-10 text-[18px] shadow-md hover:shadow-xl cursor-pointer 
      bg-[#6E7DFF] hover:bg-[#6E7DFF] md:hover:text-white rounded-md duration-150 ease-out"><FontAwesomeIcon icon={faCalendarPlus}/></button>
        </div>
      <div className='flex flex-col gap-1'>
        {dataOrar.filter((clasa) => new Date(clasa.data).toLocaleDateString() === ziOrar).sort((a, b) => a.ora.localeCompare(b.ora)).map((clasa, index) => {
            return (
              <div key={index} className="border-b pb-[5px] flex w-full h-fit gap-2 text-[13px] h-10">
                <span className="w-[20%]">{clasa.ora}</span>
                <span className="w-[30%]">{clasa.denumire}</span>
                <span className="w-[20%]">{clasa.antrenor}</span>
                <span className="w-[20%]">{clasa.capacitate}</span>
                <button onClick={() => removeClass(clasa)} className="h-fit w-[10%] shadow-md hover:shadow-xl cursor-pointer bg-[#F06E87]
                hover:bg-[#DE264B] md:hover:text-white pt-[2px] pb-[2px] rounded-md duration-150 ease-out"><FontAwesomeIcon icon={faTrashCan}/></button>
              </div>
            );
        })}
      </div>
    </div>
}

export default Zi;
