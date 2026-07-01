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


function SalaFitnessZorilor() {
  let location = useLocation()
  const [adminMenuDisplay, setAdminMenuDisplay] = useState({
    adaugaAntrenor: false,
  })
  const {isAdmin} = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
    document.querySelector(`#orar`).scrollIntoView({ behavior: 'smooth' })
}, 50);
  }, [])


  return (
    <div className="h-fit flex flex-col items-center font-finlandica pb-[50px] gap-10 pl-5 pr-5">
      <div className="relative h-fit flex items-center gap-3 pb-5 pt-5">
        <NavLink to='/clase/orar' className="block md:hidden text-white font-[600] justify-self-start ring-1 rounded-xs p-1">
          <FontAwesomeIcon icon={faSquareCaretLeft} /> Înapoi</NavLink>
        <h1 className="text-[20px] md:text-[35px] font-[700] text-center text-white justify-self-center">
          Sala fitness ZORILOR
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col gap-3 text-white">
          <h1 className="text-[24px] font-[700]">Ce oferim la Burn Fitness Zorilor?</h1>
        </div>
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
      {/* sectiune antrenori */}
      <div className="pl-1 pr-1">

        <ZonaAntrenori/>
        {isAdmin && <button onClick={() => {
          setAdminMenuDisplay({...adminMenuDisplay, adaugaAntrenor: true})
          document.body.style.overflow = 'hidden'}} 
          className="cursor-pointer bg-white text-black p-3">ADAUGĂ ANTRENOR</button>}
        {adminMenuDisplay.adaugaAntrenor && <PopUpAdaugaAntrenor adminMenuDisplay={adminMenuDisplay} setAdminMenuDisplay={setAdminMenuDisplay}/>}
          </div>
          <div id='orar' className="w-full">
        <CalendarOrar locatie='zorilor' />
          </div>
    </div>
  );
}

export default SalaFitnessZorilor;
