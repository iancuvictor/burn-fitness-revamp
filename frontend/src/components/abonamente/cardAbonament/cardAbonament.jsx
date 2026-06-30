import { faCartShopping, faCircleCheck as CircleCheckSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as CircleCheckRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router';
import axios from "axios";
  import { useRef, useEffect } from 'react';



const API_URL = import.meta.env.VITE_BACKEND_URL

function CardAbonament({titlu, preturi, tier, type, desc, viewPreturi, reducereAplicabila, identifier}) {
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  const [buying, setBuying] = useState(false);
  const [errors, setErrors] = useState({
    selectSomething: false,
  })

  const defaultOption = {
    id: identifier,
    subscriptionName: titlu,
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
    if(selectedOption.price !== ''){

      if(loggedIn){
        await axios.post(`${API_URL}/abonamente/cumparaAbonament`, selectedOption, {withCredentials : true});
        console.log('works');
      } else {
        navigate('/profile')
      }
    } else {
      setErrors({...errors, selectSomething: true})
    }
  }
  if (tier === 'regular') {
    return (
      <div ref={cardRef} className={`${buying === false ? 'max-h-60' : 'max-h-200'} 
      pt-[10px]
      md:pt-[20px]
      ring-1 ring-lime-400 shadow-md shadow-lime-400 hover:shadow-lg w-xs md:w-xs rounded-xl overflow-hidden 
      relative font-finlandica flex flex-col justify-between items-center bg-black text-white transition-all duration-400 ease-out`}>
        <div className={`${buying === false ? 'gap-0' : 'gap-1'} h-fit flex flex-col justify-evenly items-center duration-400 ease-out
        w-full pl-5 pr-5`}>
          <h1 className={`font-[700] text-[22px] md:text-[30px] text-white text-center`}>
            {titlu}
          </h1>
          <h2 className={`${desc === '' ? 'hidden' : 'block'} text-[16px] text-center`}>
            {desc}
          </h2>
          <div className={`${buying === false ? 'h-fit flex-wrap' : 'flex-col gap-4'} flex w-full pb-5 pt-5`}>
            {buying === false ? preturi.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${preturi.length === 1 ? "w-[100%]" : "w-[50%]"} flex 1 justify-center text-[15px] md:text-[16px]
                  `}
                >
                  <span className="">
                    {viewPreturi === 'studenti' && reducereAplicabila === true ? Math.round((item.pret * (100-13)/100).toFixed(2)) : 
                    viewPreturi === 'familie' && reducereAplicabila === true ? Math.round((item.pret * (100-20)/100).toFixed(2)): item.pret} Lei / {item.duratie} {item.duratie > 1 ? 'Luni' : titlu === 'ONE BURN DAY' ? 'zi' : 'Lună'}
                  </span>
                </div>
              );
            }) : 
            preturi.map((item, index) => {
              return (
                <div onClick={() => setSelectedOption({...selectedOption,
                  price: item.pret,
                  duration: item.duratie,
                   expiryDate: new Date(new Date(selectedOption.purchaseDate).setMonth(
                    selectedOption.purchaseDate.getMonth() + item.duratie))})} 
                   className={`${selectedOption.price === item.pret ?
                     'shadow-md md:shadow-lg bg-rose-500 ring-white text-white shadow-rose-500' : 'ring-lime-400'}
                   flex justify-between gap-2 cursor-pointer ring-2 pt-1 pb-1 pl-3 pr-3 rounded-md duration-75 ease-out w-full`} 
                   key={index}>
                  <span className="" 
                  key={index}>
                    {viewPreturi === 'studenti' && reducereAplicabila === true ? Math.round((item.pret * (100-13)/100).toFixed(2)) : 
                    viewPreturi === 'familie' && reducereAplicabila === true ? Math.round((item.pret * (100-20)/100).toFixed(2)): item.pret} Lei / {item.duratie} {item.duratie > 1 ? 'Luni' : titlu === 'ONE BURN DAY' ? 'zi' : 'Lună'}
                  </span>
                  <div className="">
                  <FontAwesomeIcon icon={selectedOption.price === item.pret ? CircleCheckSolid : CircleCheckRegular} regular/>
                  </div>
                    </div>
              );
            })}
          </div>
        </div>
        <button onClick={buying === false ? () => setBuying(true) : () => buySubscription()} 
        className={`${selectedOption.price !== '' ? 'bg-rose-500 text-white' : ''} 
        outline-none active:bg-rose-500 md:hover:bg-rose-500 w-full h-15 pt-[10px] pb-[10px] z-2
         cursor-pointer group/buyButton flex flex-row justify-center items-center duration-150 ease-out
          pl-[10px] pr-[10px] gap-2`}>
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



  } else if (tier === "premium") {
    return (
      <div className={`ring-4 ${type === "GOLD" ? "ring-amber-400/50" : "ring-slate-600/50"} h-70 shadow-lg shadow-amber-400/40 w-xs md:w-xs rounded-xl pt-2
      overflow-hidden cursor-pointer relative font-finlandica flex flex-col justify-between items-center bg-black 
      text-white gap-3 duration-150 ease-out`}>
        <div className="flex flex-col justify-between items-center h-40 gap-3">
          <div className="flex flex-col items-center gap-0">
            <h1
              className={`${type === "GOLD" ? "text-[#F7B52F]" : "text-[#C3CAD9]"} italic font-[800] text-[30px]`}
            >
              {type}
            </h1>
            <h1 className="font-bold text-[25px]">{titlu}</h1>
            <div className="w-full flex flex-wrap pl-[20px] pr-[20px] border-box duration-400 ease-out">
              {preturi.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${preturi.length === 1 ? "w-[100%]" : "w-[50%]"} flex 1 justify-center text-[15px] md:text-[14px]`}
                >
                  <span>
                    {viewPreturi === 'studenti' && titlu !== 'FITNESS MATINAL' ? Math.round((item.pret * (100-13)/100).toFixed(2)) : 
                    viewPreturi === 'familie' && titlu !== 'FITNESS MATINAL' ? Math.round((item.pret * (100-20)/100).toFixed(2)): item.pret} Lei / {item.duratie} {item.duratie > 1 ? 'Luni' : 'Lună'}
                  </span>
                </div>
              );
            })}
            </div>
          </div>
          <p className="text-center text-[#B3B3C7] text-[14px] duration-400 ease-out pl-[10px] pr-[10px]">
            {desc}
          </p>
        </div>
        <button className="outline-none active:bg-rose-500 w-full h-15 md:hover:bg-rose-500 z-2 cursor-pointer
         flex flex-row justify-center items-center duration-150 ease-out pl-[10px] pr-[10px] gap-2">
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
}

export default CardAbonament;
