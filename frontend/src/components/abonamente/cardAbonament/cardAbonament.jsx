import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardAbonament({titlu, preturi, imagine, tier, type, desc}) {

  console.log(preturi);
  if (tier === 'regular') {
    return (
      <div className="group duration-400 h-[450px] md:h-[480px] w-xs md:w-xs rounded-xl overflow-hidden cursor-pointer relative font-finlandica flex flex-col justify-between items-center bg-black text-white duration-150 ease-out">
        <div className=" z-1 absolute top-0 w-full h-full md:opacity-30 md:bg-black hover:opacity-0 duration-400"></div>
        <div className="w-full relative h-60 md:h-80 md:group-hover:h-60 duration-400 ease-out overflow-hidden">
          <img
            src={imagine}
            alt=""
            className="w-full h-60 md:h-80 md:group-hover:scale-120 duration-400 ease-out object-cover object-top select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-40% to-transparent"></div>
        </div>
        <div className="flex flex-col justify-evenly items-center h-40 md:h-20 md:group-hover:h-40 duration-400 ease-out">
          <h1 className="font-bold text-[22px] md:text-[25px]">
            {titlu}
          </h1>
          <div className="w-full flex flex-wrap pl-[20px] pr-[20px] border-box md:m-h-0 md:overflow-hidden md:group-hover:m-h-96 md:opacity-0 md:group-hover:opacity-100 duration-400 ease-out">
            {preturi.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${preturi.length === 1 ? "w-[100%]" : "w-[50%]"} flex 1 justify-center text-[15px] md:text-[14px]`}
                >
                  <span>
                    {item.pret} Lei / {item.duratie} {item.duratie > 1 ? 'Luni' : 'Lună'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <button className="outline-none active:bg-[#DE264B] md:hover:bg-[#DE264B] w-full h-20 md:h-0 group-hover:h-20 z-2 cursor-pointer group/buyButton flex flex-row justify-center items-center md:opacity-0 md:group-hover:opacity-100 duration-400 ease-out pl-[10px] pr-[10px] gap-2">
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
      <div className="group h-[480px] w-xs md:w-md rounded-xl overflow-hidden cursor-pointer relative font-finlandica flex flex-col justify-between items-center bg-black text-white gap-3 duration-150 ease-out">
        <div
          className={`z-1 absolute top-0 w-full h-full md:bg-black md:opacity-30 hover:opacity-0 duration-150 ease-out`}
        ></div>
        <div className="w-full relative h-60 md:h-80 md:group-hover:h-60 duration-400 ease-out overflow-hidden">
          <img
            src={imagine}
            alt=""
            className="w-full h-60 md:h-80 md:group-hover:scale-120 duration-400 ease-out object-cover object-top select-none"
          />
          <div
            className={`${type === "GOLD" ? "md:bg-[#FFDD80] opacity-20" : "md:bg-[#747A80] opacity-20"} z-0 absolute top-0 w-full h-full`}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-40% to-transparent"></div>
        </div>

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
                    {item.pret} Lei / {item.duratie} {item.duratie > 1 ? 'Luni' : 'Lună'}
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
        <button className="outline-none active:bg-[#DE264B] md:hover:bg-[#DE264B] w-full h-20 md:h-0 group-hover:h-20 z-2 cursor-pointer group/buyButton flex flex-row justify-center items-center md:opacity-0 md:group-hover:opacity-100 duration-100 md:duration-200 ease-out pl-[10px] pr-[10px] gap-2">
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
