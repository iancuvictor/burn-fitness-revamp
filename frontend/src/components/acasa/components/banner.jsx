import { NavLink } from "react-router";
import videoBanner from "../../../media/BurnClujZorilor1080p.mp4";
// import CardAbonament from "../abonamente/cardAbonament/cardAbonament";

const navLinkStyle =
  "hover:text-redishPinkDark hover:underline underline-offset-5 duration-75 ease-out";

function Banner() {
  return <div
      className="relative flex flex-col h-150 w-full justify-center items-center pt-20 md:pt-20
  md:justify-center font-finlandica"
    >
      <div className="relative h-full w-full flex flex-col items-center justify-center">
        <div className="absolute h-full w-full z-0 top-0 overflow-hidden">
          <div className="z-1 absolute inset-0 bg-gradient-to-r from-black from-0% via-transparent via-100% to-transparent"></div>
          <video
            src={videoBanner}
            autoPlay={true}
            muted={true}
            loop={true}
            className="object-cover w-full h-full z-0 opacity-30 select-none"
          ></video>
        </div>
        <div className="z-1 w-fit box-border flex flex-col">
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
              to="/abonamente"
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
}

export default Banner;