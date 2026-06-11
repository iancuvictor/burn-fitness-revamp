import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import PopUp from "../popUps/popUp";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function AdminDashboard() {
  const { user, setLoggedIn, setIsAdmin } = useContext(AuthContext);
  const [alert, setAlert] = useState({
    logOut: false,
  });

  const logOut = () => {
    axios.post(`${API_URL}/users/logout`);
    setLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen font-finlandica pt-[50px]">
      <div className={`${alert.logOut ? "z-4 fixed top-0 left-0" : "hidden"}`}>
        <PopUp
          type="alert"
          message="Ești sigur că vrei să te deconectezi?"
          ifYes={logOut}
          ifNo={() => setAlert({ ...alert, logOut: false })}
        />
      </div>
      <h1 className="font-[700]">Conectat cu contul: {user.username}</h1>
      <button
        onClick={() => setAlert({ ...alert, logOut: true })}
        className="cursor-pointer bg-[#DE264B] text-white p-[10px] rounded-md"
      >
        Log Out
      </button>
    </div>
  );
}

export default AdminDashboard;
