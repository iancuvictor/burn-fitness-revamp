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

export default function CardAbonamentRegular({ data, viewPreturi }) {
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  const [buying, setBuying] = useState(false);
  const [errors, setErrors] = useState({
    selectSomething: false,
  })

  const defaultOption = {
    id: data._id,
    subscriptionName: data.titlu,
    price: '',
    duration: '',
    purchaseDate: new Date(),
    expiryDate: ''
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
        } catch(err) {
          if(err.response.data.error === 'subscriptionAlreadyBought'){
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
      <div ref={cardRef} className={`${buying === false ? 'max-h-70' : 'max-h-200'} p-3
      ring-1 ring-rose-500 shadow-md shadow-rose-500 hover:shadow-lg w-xs md:w-xs rounded-xl overflow-hidden 
      relative font-finlandica flex flex-col justify-between items-center bg-black text-white transition-all duration-75 ease-out`}>
        <div className={`${buying === false ? 'gap-0' : 'gap-1'} h-fit flex flex-col justify-evenly items-center duration-75 ease-out
        w-full pl-5 pr-5`}>
          <h1 className={`font-[700] text-[22px] md:text-[24px] text-white text-center`}>
            {data.titlu}
          </h1>
          <h2 className={`${data.desc === '' ? 'hidden' : 'block'} text-[16px] text-center text-gray-400`}>
            {data.desc}
          </h2>
          <div className={`${buying === false ? 'h-fit flex-wrap' : 'flex-col gap-4'} flex w-full pb-5 pt-5`}>
            {buying === false ? data.preturi.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${data.preturi.length === 1 ? "w-[100%]" : "w-[50%]"} flex 1 justify-center text-[15px] md:text-[14px]
                  `}
                >
                  <span className="">
                    {viewPreturi === 'studenti' && data.reducereAplicabila === true ? Math.round((item.pret * (100 - 13) / 100).toFixed(2)) :
                      viewPreturi === 'familie' && data.reducereAplicabila === true ? Math.round((item.pret * (100 - 20) / 100).toFixed(2)) : item.pret} Lei / {item.duratie} {item.duratie > 1 ? 'Luni' : data.titlu === 'ONE BURN DAY' ? 'zi' : 'Lună'}
                  </span>
                </div>
              );
            }) :
              data.preturi.map((item, index) => {
                return (
                  <div onClick={() => setSelectedOption({
                    ...selectedOption,
                    price: item.pret,
                    duration: item.duratie,
                    expiryDate: new Date(new Date(selectedOption.purchaseDate).setMonth(
                      selectedOption.purchaseDate.getMonth() + item.duratie))
                  })}
                    className={`${selectedOption.price === item.pret ?
                      'shadow-md md:shadow-lg bg-rose-500 ring-white text-white shadow-rose-500' : 'ring-lime-400'}
                   flex justify-between gap-2 cursor-pointer ring-2 pt-1 pb-1 pl-3 pr-3 rounded-md duration-75 ease-out w-full`}
                    key={index}>
                    <span className=""
                      key={index}>
                      {viewPreturi === 'studenti' && data.reducereAplicabila === true ? Math.round((item.pret * (100 - 13) / 100).toFixed(2)) :
                        viewPreturi === 'familie' && data.reducereAplicabila === true ? Math.round((item.pret * (100 - 20) / 100).toFixed(2)) : item.pret} Lei / {item.duratie} {item.duratie > 1 ? 'Luni' : data.titlu === 'ONE BURN DAY' ? 'zi' : 'Lună'}
                    </span>
                    <div className="">
                      <FontAwesomeIcon icon={selectedOption.price === item.pret ? CircleCheckSolid : CircleCheckRegular} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <button onClick={buying === false ? () => setBuying(true) : () => buySubscription()}
          className={`${selectedOption.price !== '' ? 'bg-rose-500 text-white' : ''} w-full h-15 z-2 outline-none active:bg-rose-500 hover:bg-rose-500
         cursor-pointer flex flex-row justify-center items-center duration-75 ease-out gap-2 rounded-md`}>
          <FontAwesomeIcon
            icon={faCartShopping}
            className={selectedOption.price !== '' ? 'text-white' : 'text-rose-500'}
          />
          <span className="text-white">
            {selectedOption.price !== '' ? 'Cumpără abonamentul' : 'Selectează abonamentul'}
          </span>
        </button>
      </div>
    );
}

