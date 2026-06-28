import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { Outlet } from "react-router";
import { PopUp } from "../../../index";
import MobileAccountNavbar from "./mobileAccountNavbar";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function ProfilePage() {

  const [ display, setDisplay ] = useState('abonamente');
  const { setLoggedIn, setUser } = useContext(AuthContext);
  const [alert, setAlert] = useState({
    logOut: false,
  });

  const logOut = () => {
    axios.post(`${API_URL}/users/logout`);
    setLoggedIn(false);
    setUser();
  };

  useEffect(() => {
        async function checkCookie(){
            try {
                let response = await axios.get(`${API_URL}/users/profile`, { withCredentials: true });
                let userData = response.data.userData;
                    setUser(userData);
    
            } catch {
                console.log('Error');
            }
        }
        checkCookie()
    }, []);

  return <div className="w-full h-full font-finlandica flex flex-col items-center bg-white">
    <div className={`${alert.logOut ? "animate-fade-in duration-500 ease-out z-4 fixed top-0 left-0" : "hidden"}`}>
        <PopUp
          type="alert"
          message="Ești sigur că vrei să te deconectezi?"
          ifYes={logOut}
          ifNo={() => setAlert({ ...alert, logOut: false })}
        />
      </div>
      <Outlet/>
      <MobileAccountNavbar logOut={() => setAlert({ ...alert, logOut: true })} display={display} setDisplay={setDisplay}/>
    </div>
}

export default ProfilePage;
