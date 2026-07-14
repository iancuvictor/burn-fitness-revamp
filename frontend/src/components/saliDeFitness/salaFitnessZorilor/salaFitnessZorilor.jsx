import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
import CalendarOrar from "../orar/calendarOrar";
import BlockContact from "../../contact/blockContact/blockContact";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import PopUpAdaugaAntrenor from "../../AdminDashboard/adminPaginiPublice/popUpAdaugaAntrenor";
import ZonaAntrenori from "../zonaAntrenori/zonaAntrenori";
import { useLocation } from "react-router";

import videoBanner from "../../../media/BurnClujZorilor1080p.mp4";


function SalaFitnessZorilor() {
  let location = useLocation()
  const [adminMenuDisplay, setAdminMenuDisplay] = useState({
    adaugaAntrenor: false,
  })

  useEffect(() => {
    if (location.hash !== '') {
      setTimeout(() => {
        document.querySelector(location.hash).scrollIntoView({ behavior: 'smooth' })
      }, 50);
    }
  }, [])


  return (
    <div className="h-fit flex flex-col items-center font-finlandica pb-[50px] gap-5">
      <div className="relative h-60 w-full z-0 top-0 overflow-hidden flex items-center justify-center">
        <div className="z-1 absolute inset-0 bg-gradient-to-r from-black from-0% via-transparent via-20% to-transparent"></div>
        <div className="z-1 absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-50% to-transparent"></div>
        <video
          src={videoBanner}
          autoPlay={true}
          muted={true}
          loop={true}
          controls={false}
          className="object-cover w-full h-full z-0 opacity-40 select-none"
        ></video>
      <h1 className="absolute text-[24px] md:text-[40px] font-[700] text-center text-white justify-self-center">
        Sala fitness ZORILOR
      </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col gap-3 text-white">
          <h1 className="text-[24px] font-[700]">Ce oferim la Burn Fitness Zorilor?</h1>
        </div>
      </div>
      {/* sectiune antrenori */}
      <div className="pl-1 pr-1">
        <ZonaAntrenori locatie='ZORILOR' />
      </div>
      <div id='orar' className="w-full md:pl-10 md:pr-10">
        <CalendarOrar locatie='zorilor' />
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-white text-[24px] font-[700]">Date contact</h1>
        <BlockContact
          locatie="Zorilor"
          nrTel="0771 511 431"
          adresa="Louis Pasteur 58, Cluj-Napoca"
          linkAdresa='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10933.941538443678!2d23.557627201080333!3d46.75532824825045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490e78b14ef555%3A0x82da4b4e100cf036!2sBurn%20Cluj!5e0!3m2!1sen!2sro!4v1780302279546!5m2!1sen!2sro"'
          programLuniVineri="06:00 - 23:00"
          programSambata="9:00 - 18:00"
          programDuminica="10:00 - 17:00"
        />
      </div>
    </div>
  );
}

export default SalaFitnessZorilor;
