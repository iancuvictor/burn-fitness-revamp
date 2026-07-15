import ZiOrar from './ziOrar';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { setDateOrar, changeCalendarWeek } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretRight, faSquareCaretLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import Filtre from '../../filtre/filtre';

const API_URL = import.meta.env.VITE_BACKEND_URL

export default function CalendarOrar({locatie}) {
  const [dateCalendar, setDateCalendar] = useState(setDateOrar());
  const { user } = useContext(AuthContext);
  const [dataOrar, setDataOrar] = useState([]);
  const [errors, setErrors] = useState({
    noAerobic: "",
  });
  const [filtre, setFiltre] = useState({
    antrenor: [],
    clasa: [],
    viewExpired: true,
    open: false,
  });

  async function getOrar() {
    try{
      let response = await axios.get(
        `${API_URL}/classes/orarClase?locatie=${locatie}`,
      );
      setDataOrar(response.data);
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (user !== undefined) {
      if (
        user.activeSubscriptions.some((subscription) =>
          subscription.subscriptionName.toLowerCase().includes("aerobic"),
        )
      ) {
        setErrors(prev => ({ ...prev, noAerobic: false }));
      } else {
        setErrors({ ...errors, noAerobic: true });
      }
    } else {
      setErrors({ ...errors, noAerobic: true });
    }

    getOrar();
  }, []);

  return <div
    id="orar"
    className="h-fit flex flex-col items-center shadow-xl p-5 pb-20 rounded-xl bg-white gap-5 w-full"
  >
    {filtre.open && <Filtre filtre={filtre} setFiltre={setFiltre} />}
    <div className="flex flex-row items-center gap-5">
      <button onClick={() => setFiltre({ ...filtre, open: true })}
        className="cursor-pointer bg-black p-2 rounded-md text-white text-[12px] md:text-[14px] font-[500]">FILTRE <FontAwesomeIcon icon={faFilter} /></button>
      <div className="flex flex-col items-center">
        <span className='text-[13px] md:text-[16px]'>
          {dateCalendar[0].toLocaleDateString()} -{" "}
          {dateCalendar[6].toLocaleDateString()}
        </span>
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() =>
              changeCalendarWeek("substract", dateCalendar, setDateCalendar)
            }
            className="cursor-pointer"
          >
            <FontAwesomeIcon icon={faSquareCaretLeft} />
          </button>
          <h2 className="text-[16px] md:text-[20px] font-[700]">
            ORAR-CLASE
          </h2>
          <button
            onClick={() =>
              changeCalendarWeek("add", dateCalendar, setDateCalendar)
            }
            className="cursor-pointer"
          >
            <FontAwesomeIcon icon={faSquareCaretRight} />
          </button>
        </div>
      </div>
    </div>
    <span
      className={`${errors.noAerobic ? "block" : "hidden"} text-red-500`}
    >
      Ai nevoie de abonament AEROBIC pentru a te înscrie
    </span>
    <div className="h-fit flex flex-col md:grid md:grid-cols-4 gap-10 md:gap-5 w-full">
      <ZiOrar
        dataOrar={dataOrar}
        zi="Luni"
        data={dateCalendar[0].toLocaleDateString()}
        filtre={filtre}
        calendarDate={dateCalendar}
        getOrar={getOrar}
      />
      <ZiOrar
        dataOrar={dataOrar}
        zi="Marți"
        data={dateCalendar[1].toLocaleDateString()}
        filtre={filtre}
        calendarDate={dateCalendar}
        getOrar={getOrar}
      />
      <ZiOrar
        dataOrar={dataOrar}
        zi="Miercuri"
        data={dateCalendar[2].toLocaleDateString()}
        filtre={filtre}
        calendarDate={dateCalendar}
        getOrar={getOrar}
      />
      <ZiOrar
        dataOrar={dataOrar}
        zi="Joi"
        data={dateCalendar[3].toLocaleDateString()}
        filtre={filtre}
        calendarDate={dateCalendar}
        getOrar={getOrar}
      />
      <ZiOrar
        dataOrar={dataOrar}
        zi="Vineri"
        data={dateCalendar[4].toLocaleDateString()}
        filtre={filtre}
        calendarDate={dateCalendar}
        getOrar={getOrar}
      />
      <ZiOrar
        dataOrar={dataOrar}
        zi="Sâmbătă"
        data={dateCalendar[5].toLocaleDateString()}
        filtre={filtre}
        calendarDate={dateCalendar}
        getOrar={getOrar}
      />
      <ZiOrar
        dataOrar={dataOrar}
        zi="Duminică"
        data={dateCalendar[6].toLocaleDateString()}
        filtre={filtre}
        calendarDate={dateCalendar}
        getOrar={getOrar}
      />
    </div>
  </div>
}