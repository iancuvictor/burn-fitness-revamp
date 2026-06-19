import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = import.meta.env.VITE_BACKEND_URL

function CardAbonament({titlu, preturi, tier, type, desc, viewPreturi}) {

  if (tier === 'regular') {
    return (
      <div className="pt-[20px] ring-2 ring-lime-400 shadow-md shadow-lime-400 hover:shadow-lg duration-400 h-70 w-xs md:w-xs rounded-xl overflow-hidden 
      cursor-pointer relative font-finlandica flex flex-col justify-between items-center bg-black text-white duration-75 ease-out">
        <div className="flex flex-col justify-evenly items-center h-40 duration-400 ease-out">
          <h1 className="font-[700] text-[22px] md:text-[30px] text-lime-400 text-center">
            {titlu}
          </h1>
          <h2 className="text-[16px] text-center">
            {desc}
          </h2>
          <div className="w-full flex flex-wrap pl-[20px] pr-[20px] border-box">
            {preturi.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${preturi.length === 1 ? "w-[100%]" : "w-[50%]"} flex 1 justify-center text-[15px] md:text-[16px]`}
                >
                  <span>
                    {viewPreturi === 'studenti' && titlu !== 'FITNESS MATINAL' ? Math.round((item.pret * (100-13)/100).toFixed(2)) : 
                    viewPreturi === 'familie' && titlu !== 'FITNESS MATINAL' ? Math.round((item.pret * (100-20)/100).toFixed(2)): item.pret} Lei / {item.duratie} {item.duratie > 1 ? 'Luni' : titlu === 'ONE BURN DAY' ? 'zi' : 'Lună'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <button className="outline-none active:bg-[#DE264B] md:hover:bg-[#DE264B] w-full h-15 z-2
         cursor-pointer group/buyButton flex flex-row justify-center items-center duration-150 ease-out pl-[10px] pr-[10px] gap-2">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-[#DE264B]"
          />
          <span className="group-hover/buyButton:text-white text-[#B3B3C7]">
            Cumpără abonamentul
          </span>
        </button>
      </div>
    );
  } else if (tier === "premium") {
    return (
      <div className={`ring-4 ${type === "GOLD" ? "ring-amber-400/50" : "ring-slate-600/50"} group h-70 w-xs md:w-xs rounded-xl 
      overflow-hidden cursor-pointer relative font-finlandica flex flex-col justify-between items-center bg-black 
      text-white gap-3 duration-150 ease-out`}>
        <div
          className={`z-1 absolute top-0 w-full h-full md:bg-black md:opacity-30 hover:opacity-0 duration-150 ease-out`}
        ></div>
        <div className="flex flex-col justify-between items-center h-40 gap-3">
          <div className="flex flex-col items-center gap-0">
            <h1
              className={`${type === "GOLD" ? "text-[#F7B52F]" : "text-[#C3CAD9]"} font-[800] text-[30px]`}
            >
              {type}
            </h1>
            <h1 className="font-bold text-[25px]">{titlu}</h1>
            <div className="w-full flex flex-wrap pl-[20px] pr-[20px] border-box md:opacity-0 md:group-hover:opacity-100 duration-400 ease-out">
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
          <p className="text-center text-[#B3B3C7] text-[14px] md:text-[16px] md:opacity-0 md:group-hover:opacity-100 duration-400 ease-out pl-[10px] pr-[10px]">
            {desc}
          </p>
        </div>
        <button className="outline-none active:bg-[#DE264B] md:hover:bg-[#DE264B] w-full h-15 md:h-0 group-hover:h-20 z-2 cursor-pointer group/buyButton flex flex-row justify-center items-center md:opacity-0 md:group-hover:opacity-100 duration-100 md:duration-200 ease-out pl-[10px] pr-[10px] gap-2">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-[#DE264B]"
          />
          <span className="md:group-hover/buyButton:text-white text-[#B3B3C7]">
            Cumpără abonamentul
          </span>
        </button>
      </div>
      
    );
  }
}

export default CardAbonament;
