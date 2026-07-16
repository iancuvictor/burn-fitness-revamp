import { useEffect, useState, useRef, useContext } from "react";
import axios from 'axios';
import { toast } from 'sonner';
import { AuthContext } from "../../../../../../context/AuthContext";

const API_URL = import.meta.env.VITE_BACKEND_URL

function CardListaAbonamente({ dataAbonament }) {
  const {refreshUser} = useContext(AuthContext);
  const [detalii, setDetalii] = useState(false);
  let zileRamase = Math.ceil((new Date(dataAbonament.expiryDate) - Date.now()) / (1000 * 60 * 60 * 24));

  const cardAbonament = useRef(null)

  const eliminaAbonamentul = async (reason) => {
    if (reason === 'renew') {
      try {
        let response = await axios.delete(`${API_URL}/abonamente/eliminaAbonament`, { data: dataAbonament })
        if (response.status === 200) {
          let response = await axios.post(`${API_URL}/payments/createPayment`, dataAbonament, { withCredentials: true });
          window.location.href = response.data.url;
        }
      } catch (err) {
        toast.error(`A intervenit o eroare`);
      }
    } else if (reason === 'renunta') {
      try {
        let response = await axios.delete(`${API_URL}/abonamente/eliminaAbonament`, { data: dataAbonament }, { withCredentials: true })
        console.log(response);
        toast.success(`Abonamentul a fost eliminat!`)
      } catch (err) {
        toast.error(`A intervenit o eroare`)
      }
    } 
    refreshUser();
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardAbonament.current && !cardAbonament.current.contains(e.target)) {
        setDetalii(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])


  return <div ref={cardAbonament}
    className="relative flex flex-col gap-2 h-fit w-full md:w-fit
              shadow-md p-5 rounded-md font-finlandica ring-2"
  >
    <div className="flex flex-col items-baseline justify-between">
      <div className="flex items-baseline justify-between gap-5">
        <h1 className="font-[700] text-[18px]">
          {dataAbonament.subscriptionName}
        </h1>
      </div>
      <span className="text-[16px]">
        {zileRamase <= 0 ? (
          <span className="text-red-500 font-[600]">EXPIRAT</span>
        ) : (
          <span>
            <span className="font-[700]">Zile rămase:</span>{" "}
            {zileRamase}{" "}
            {zileRamase > 19
              ? "de zile"
              : zileRamase > 1
                ? "zile"
                : "zi"}
          </span>
        )}
      </span>
    </div>
    {zileRamase > 0 && <div className="h-fit">
      <button
        onClick={() => setDetalii(!detalii)}
        className={`cursor-pointer bg-rose-500 rounded-md text-[14px] w-fit text-white p-2`}
      >
        {detalii === false ? 'Vezi mai multe detalii' : 'Vezi mai puține detalii'}
      </button>
      <div className={`${detalii === true ? 'opacity-100 h-fit' : 'opacity-0 h-0'} flex flex-col justify-between text-[15px] pt-2`}>
        <span>Durație: {dataAbonament.duration} {dataAbonament.duration > 1 ? 'Luni' : 'Lună'}</span>
        <span>Preț: {dataAbonament.price} lei</span>
        <span>Plătit: {dataAbonament.pricePaid} lei</span>
        <span>Cumpărat în: {new Date(dataAbonament.purchaseDate).toLocaleDateString()}</span>
        <span>Expiră în: {new Date(dataAbonament.expiryDate).toLocaleDateString()}</span>
      </div>
    </div>}
    {zileRamase <= 0 && <div className="z-1 flex gap-2 text-[16px]">
      <button onClick={() => eliminaAbonamentul('renew')}
        className={`cursor-pointer bg-green-500 rounded-md text-white p-2`}
      >
        Reînnoiește abonamentul
      </button>
      <button onClick={() => eliminaAbonamentul('renunta')}
        className={`cursor-pointer bg-rose-500 rounded-md text-white p-2`}>Elimină abonamentul</button>
    </div>}
  </div>
}

export default CardListaAbonamente;
