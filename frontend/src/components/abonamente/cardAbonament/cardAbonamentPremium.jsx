import { faCartShopping, faCircleCheck as CircleCheckSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as CircleCheckRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router';
import axios from "axios";
import { useRef, useEffect } from 'react';
import { toast } from "sonner";


const API_URL = import.meta.env.VITE_BACKEND_URL

export default function CardAbonamentPremium({ data, viewPreturi }) {
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  const [buying, setBuying] = useState(false);
  const [errors, setErrors] = useState({
    selectSomething: false,
  })

  console.log(data);

  const defaultOption = {
    id: data._id,
    subscriptionName: data.titlu,
    price: data.preturi[0].pret,
    duration: data.preturi[0].duratie,
    purchaseDate: new Date(),
    expiryDate: new Date(new Date(selectedOption.purchaseDate).setMonth(
      selectedOption.purchaseDate.getMonth() + data.preturi[0].duratie))
  }
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setBuying(false);
        setSelectedOption(defaultOption);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buySubscription = async () => {
    if (selectedOption.price !== '') {
      if (loggedIn) {
        try {
          let response = await axios.post(`${API_URL}/payments/createPayment`, selectedOption, { withCredentials: true });
          window.location.href = response.data.url;
        } catch (err) {
          if (err.response.data.error === 'subscriptionAlreadyBought') {
            toast.error(`Deja ai un abonament activ`);
          }
        }
      } else {
        navigate('/profile')
      }
    } else {
      setErrors({ ...errors, selectSomething: true })
    }
  }
  return (
    <div className={`ring-4 ${data.tierName === "GOLD" ? "ring-amber-400/50" : "ring-slate-600/50"} h-70 shadow-lg shadow-amber-400/40 w-xs md:w-xs rounded-xl pt-2
      overflow-hidden cursor-pointer relative font-finlandica flex flex-col justify-between items-center bg-black 
      text-white gap-3 duration-75 ease-out`}>
      <div className="flex flex-col justify-between items-center h-40 gap-3">
        <div className="flex flex-col items-center gap-0">
          <h1
            className={`${data.tierName === "GOLD" ? "text-[#F7B52F]" : "text-[#C3CAD9]"} italic font-[800] text-[30px]`}
          >
            {data.tierName}
          </h1>
          <h1 className="font-bold text-[25px]">{data.titlu}</h1>
          <div className="w-full flex flex-wrap pl-[20px] pr-[20px] border-box duration-400 ease-out">
            {data.preturi.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${data.preturi.length === 1 ? "w-[100%]" : "w-[50%]"} flex 1 justify-center text-[15px] md:text-[14px]`}
                >
                  <span>
                    {viewPreturi === 'studenti' && data.reducereAplicabila ? Math.round((item.pret * (100 - 13) / 100).toFixed(2)) :
                      viewPreturi === 'familie' && data.reducereAplicabila ? Math.round((item.pret * (100 - 20) / 100).toFixed(2)) : item.pret} Lei / {item.duratie} {item.duratie > 1 ? 'Luni' : 'Lună'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-center text-[#B3B3C7] text-[14px] duration-75 ease-out pl-[10px] pr-[10px]">
          {data.desc}
        </p>
      </div>
      <button onClick={() => buySubscription()}
        className="outline-none active:bg-rose-500 w-full h-15 md:hover:bg-rose-500 z-2 cursor-pointer
         flex flex-row justify-center items-center duration-75 ease-out pl-[10px] pr-[10px] gap-2">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="text-rose-500"
        />
        <span className="text-white">
          Cumpără abonamentul
        </span>
      </button>
    </div>

  );
}

