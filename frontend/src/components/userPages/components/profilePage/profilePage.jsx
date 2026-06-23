import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { NavLink } from "react-router";
import { PopUp } from "../../../index";
import ListaAbonamenteProfil from "./listaAbonamenteProfil";
import MobileAccountNavbar from "./mobileAccountNavbar";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function ProfilePage() {

  const [display, setDisplay] = useState('abonamente');
  const { setLoggedIn, setUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [alert, setAlert] = useState({
    logOut: false,
  });

  const logOut = () => {
    axios.post(`${API_URL}/users/logout`);
    setLoggedIn(false);
    setUser();
  };

  return <div className="min-h-screen pt-20 md:pt-25 font-finlandica flex flex-col items-center bg-white pl-5 pr-5 pb-30">
    <MobileAccountNavbar logOut={() => setAlert({ ...alert, logOut: true })} display={display} setDisplay={setDisplay}/>
      <div className={`${alert.logOut ? "z-4 fixed top-0 left-0" : "hidden"}`}>
        <PopUp
          type="alert"
          message="Ești sigur că vrei să te deconectezi?"
          ifYes={logOut}
          ifNo={() => setAlert({ ...alert, logOut: false })}
        />
      </div>
      <div className={`${display === 'abonamente' ? 'flex' : 'hidden'} flex-col gap-10 relative justify-center w-full`}>
        <div className="w-full">
          <h1 className="font-[700] text-[20px]">Abonamente active: ({user.activeSubscriptions.length})</h1>
          <ListaAbonamenteProfil data={user.activeSubscriptions}/>
        </div>
        <div className="w-full">
          <h1 className="font-[700] text-[20px]">Clase programate: ({user.activeSubscriptions.length})</h1>
          <ListaAbonamenteProfil data={user.activeSubscriptions}/>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className={`${display === 'setariCont' ? 'flex' : 'hidden'} flex-col w-fit shadow-xl p-10`}>
          <h1 className="font-[700]">Gestionează contul</h1>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span>Email:</span>
              <input
                className="w-70"
                type="text"
                name=""
                id=""
                defaultValue={user.email}
              />
            </div>
            <div className="flex flex-col">
              <span>Nr. telefon:</span>
              <input
                className="w-70"
                type="text"
                name=""
                id=""
                defaultValue={user.phone}
              />
            </div>
            <div className="flex flex-col">
              <span>Data nașterii:</span>
              <input
                className="w-70"
                type="text"
                name=""
                id=""
                defaultValue={"test"}
              />
            </div>
            <span>Poză de profil</span>
            <button className="cursor-pointer">Salvează modificările</button>
          </div>
        </div>

        <div className={`${display === 'metodePlata' ? 'flex' : 'hidden'} flex-col w-fit shadow-xl p-10`}>
          <h1 className="font-[700]">Metode de plată</h1>
        </div>
      </div>
      {/* <button
          onClick={() => setAlert({ ...alert, logOut: true })}
          className="cursor-pointer bg-[#DE264B] text-white p-[10px] rounded-md"
        >
          Log Out
        </button> */}
    </div>
}

export default ProfilePage;
