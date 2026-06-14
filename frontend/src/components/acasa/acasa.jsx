import { NavLink } from "react-router";
import CardAbonament from "../abonamente/cardAbonament/cardAbonament";

const navLinkStyle =
  "hover:text-redishPinkDark hover:underline underline-offset-5 duration-75 ease-out";

function Acasa() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center font-finlandica pb-[50px] bg-black">
      <div className="w-300 box-border pl-20 pr-20 flex justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h1 className="text-[60px] font-[700] text-white leading-[60px]">
              TRAIN
              <br />
              <span className="text-redishPinkDark">DIFFERENT</span>
            </h1>
            <h2 className="text-[18px] text-white">
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
            className="w-fit bg-redishPinkDark text-white font-[600] p-[20px] rounded-md 
          hover:shadow-lg hover:shadow-redishPinkDark/40 duration-150 ease-out"
          >
            Cumpără primul tău abonament!
          </NavLink>
        </div>
        <div>
          <div className="w-100">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Acasa;
