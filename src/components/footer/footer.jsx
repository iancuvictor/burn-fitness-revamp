import GoogleStore from "./assets/googleStore.svg";
import AppleStore from "./assets/appleStore.svg";
import { NavLink } from "react-router";

function Footer() {
  return (
    <div className=" w-full flex flex-col items-center p-[20px] border-box bg-black gap-2">
      <h1 className="text-white font-finlandica font-bold text-[24px]">
        Descarcă aplicația Burn
      </h1>
      <div className="flex gap-2">
        <a href="https://play.google.com/store/apps/details?id=com.wiseit.burnfitness&pli=1" target="_blank">
          <img src={GoogleStore} className="w-35" alt="google store app" />
        </a>
        <a href="https://apps.apple.com/us/app/burn-fitness-cluj/id6751247183" target="_blank">
          <img src={AppleStore} className="w-35" alt="apple store app" />
        </a>
      </div>
      <div className="flex justify-center items-center flex-col md:flex-row text-gray-500 gap-2 text-[11px] md:text-[14px]">
        <span className="text-center">© 2025 BurnCluj | Burn Fitness SRL RO33184520 J12/1663/2014. Toate drepturile rezervate.</span>
        <NavLink to="/regulamentul-de-functionare">Regulamentul de funcționare</NavLink>
        <span className="hidden md:block">|</span>
        <NavLink to="/termeni-si-conditii">Termeni și condiții</NavLink>
        <span className="hidden md:block">|</span>
        <NavLink to="/date-personale-informare">Politica de confidențialitate</NavLink>
        <span className="hidden md:block">|</span>
        <NavLink to="/politica-cookie-uri-ue">Politică cookie-uri</NavLink>

      </div>
    </div>
  );
}

export default Footer;
