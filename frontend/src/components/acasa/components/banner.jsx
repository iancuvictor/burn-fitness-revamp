import { NavLink } from "react-router";
import videoBanner from "../../../media/BurnClujZorilor1080p.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import CardAbonament from "../abonamente/cardAbonament/cardAbonament";

const navLinkStyle =
  "hover:text-redishPinkDark hover:underline underline-offset-5 duration-75 ease-out";

function Banner() {
  const [display, setDisplay] = useState(true);
  return (
    <div
      className="relative flex flex-col h-140 w-full justify-center items-center
  md:justify-center font-finlandica"
    >
      <div className={`${display ? 'p-3 md:p-4 h-15' : 'opacity-0 h-0'}
      relative z-1 flex justify-center items-center w-full bg-rose-500 gap-2
      text-[12px] md:text-[15px] font-[600] duration-500 ease-out`}>
            <FontAwesomeIcon
              icon={faPercent}
              className=" leading-none inline-block h-full"
            />
            <div>
              <h1 className="flex gap-1">Ești student? Ai reducere 13% la ORICE abonament!
                <span className="hidden md:block"> Prezintă-ți legitimația de student la orice recepție Burn Fitness Cluj-Napoca
                </span>
              </h1>
            </div>
            <button onClick={() => setDisplay(false)} className="cursor-pointer">
            <FontAwesomeIcon icon={faX}/>
            </button>
      </div>
      <div className="absolute h-full w-full z-0 top-0 overflow-hidden">
        <div className="z-1 absolute inset-0 bg-gradient-to-r from-black from-0% via-transparent via-100% to-transparent"></div>
        <div className="z-1 absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-10% to-transparent"></div>
        <video
          src={videoBanner}
          autoPlay={true}
          muted={true}
          loop={true}
          controls={false}
          className="object-cover w-full h-full z-0 opacity-40 select-none"
        ></video>
      </div>
      <div className="relative h-full w-full flex flex-col items-center justify-center">
        <div className="z-1 lg:w-250 box-border flex flex-row md:justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h1
                className="text-[45px] leading-[40px] font-[700] text-white 
            md:leading-[60px] md:text-[60px] "
              >
                TRAIN
                <br />
                <span className="text-redishPinkDark italic">DIFFERENT</span>
              </h1>
              <h2
                className="text-[14px]
            md:text-[18px] text-white"
              >
                Săli de Fitness Moderne în: <br />
                <NavLink
                  className={navLinkStyle}
                  to="/salidefitness/sala-fitness-zorilor"
                >
                  Zorilor
                </NavLink>
                ,{" "}
                <NavLink
                  className={navLinkStyle}
                  to="/salidefitness/sala-fitness-sigma"
                >
                  Sigma
                </NavLink>
                ,{" "}
                <NavLink
                  className={navLinkStyle}
                  to="/salidefitness/sala-fitness-marasti"
                >
                  Mărăști
                </NavLink>
                ,{" "}
                <NavLink
                  className={navLinkStyle}
                  to="/salidefitness/sala-fitness-manastur"
                >
                  Mănăștur
                </NavLink>{" "}
                și{" "}
                <NavLink
                  className={navLinkStyle}
                  to="/salidefitness/sala-fitness-flora"
                >
                  Flora
                </NavLink>
              </h2>
            </div>
            <NavLink
              to="/abonamente"
              className="text-[12px] md:text-[16px] w-fit bg-redishPinkDark text-white font-[600] p-[20px] box-content 
            rounded-md shadow-lg shadow-redishPinkDark/40
            hover:shadow-xl hover:shadow-redishPinkDark/40 duration-150 ease-out"
            >
              Cumpără primul tău abonament!
            </NavLink>
            <NavLink
              to="/freeTrial"
              className="text-[12px] md:text-[16px] w-fit bg-lime-500 text-white font-[600] p-[20px] box-content 
            rounded-md shadow-lg shadow-lime-500/40
            hover:shadow-xl duration-150 ease-out"
            >
              Prima ședință e GRATUITĂ!
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
