import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { NavLink } from "react-router";
import { PopUp } from "../../../index";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function ProfilePage() {
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

  return (
    <div className="min-h-screen pt-[50px] font-finlandica flex flex-col items-center">
      <div className={`${alert.logOut ? "contents" : "hidden"}`}>
        <PopUp
          type="alert"
          message="Ești sigur că vrei să te deconectezi?"
          ifYes={logOut}
          ifNo={() => setAlert({ ...alert, logOut: false })}
        />
      </div>
      <h1 className="text-[30px] font-[700]">
        Bine ai revenit {user.username}!
      </h1>

      <div className="flex">
        <div>
          <h1>Abonamente active:</h1>
          {user.activeSubscriptions.length > 0 ? (
            user.activeSubscriptions.map((abonament) => {
              <div>
                <h1>{abonament.titlu}</h1>
                <h1>{abonament.valoare}</h1>
                <h1>{abonament.dataExpirare}</h1>
              </div>;
            })
          ) : (
            <h1>
              Nu ai nici un abonament activ.{" "}
              <NavLink
                to="/abonamente"
                className="text-[#3454E3] md:hover:text-[#3454E3]"
              >
                Cumpără unul aici
              </NavLink>
            </h1>
          )}
        </div>

        <div className="flex flex-col">
            <h1 className="font-[700]">Gestionează contul</h1>
            <form action="">

          <input type="text" name="" id="" defaultValue={user.email} />
          <input type="text" name="" id="" defaultValue={user.phone} />
          <button className="cursor-pointer">Salvează modificările</button>
            </form>
        </div>
        <button
          onClick={() => setAlert({ ...alert, logOut: true })}
          className="cursor-pointer bg-[#DE264B] text-white p-[10px] rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
