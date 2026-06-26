const inputStyle = "w-full outline rounded-xs pl-2 pt-1 pb-1 pr-2";
import { AuthContext } from "../../../../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import TemporaryPopUp from "../../../../popUps/temporaryPopUp";
import {toast} from 'sonner';

const API_URL = import.meta.env.VITE_BACKEND_URL;

function AccountSettings() {
  const { user, refreshUser } = useContext(AuthContext);
  const uploadImage = useRef(null);
  const [alert, setAlert] = useState({
    dateActualizate: false,
  })

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    nrTelefon: user.phone,
    dataNasterii: user.dataNasterii || "",
    pozaProfil: user.profilePhoto || "",
  });

  const updateData = async () => {
    let data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("nrTelefon", formData.nrTelefon);
    (data.append("dataNasterii", formData.dataNasterii),
      data.append("pozaProfil", formData.pozaProfil));
    try {
      await axios.post(`${API_URL}/users/updateProfile`, data, {
        withCredentials: true,
      });
      toast.success('Datele au fost actualizate!')
      // setAlert({...alert, dateActualizate: true})
    } catch (err) {
      console.log(err);
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isFirstRender = useRef(true); 

  useEffect(() => {
    if(isFirstRender.current) {
    isFirstRender.current = false;
    return;
}
    refreshUser();
    updateData();
  }, [formData.pozaProfil]);

  return (
    <div className="min-h-screen flex flex-col gap-5 pt-20 pb-20 w-full ">
      
      <div className={`${alert.dateActualizate ? 'flex' : 'hidden'} fixed top-0 left-0 justify-center items-center h-full w-full`}>
      <TemporaryPopUp message={'Datele au fost actualizate!'}/>
      </div>
      <h1 className="font-[700] text-[20px]">Gestionează contul</h1>
      <div className="flex flex-col shadow-md p-5 w-full md:w-100 overflow-hidden gap-5">
        <div className="flex flex-col gap-2">

        <div className="flex flex-col gap-3 items-center justify-center ">
          <div className="relative w-30 h-30 md:h-50 md:w-50 flex items-center">
            <img
              src={`${API_URL}/uploads/POZEPROFIL/${user.profilePhoto}?t=${Date.now()}`}
              alt="poza profil"
              className="object-cover object-center w-full h-full rounded-full ring-2 ring-rose-500"
              />
          </div>
          <button
            onClick={() => uploadImage.current.click()}
            className="bg-rose-500 text-white pt-1 pb-1 pl-2 pr-2 rounded-xs
            active:bg-rose-800 duration-150 ease-out
            "
          >
            Schimbă poza
          </button>
          <input
            ref={uploadImage}
            type="file"
            className="hidden"
            onChange={(e) => updateField("pozaProfil", e.target.files[0])}
            />
        </div>
        <div className="flex flex-col">
          <span>Nume:</span>
          <input
            onChange={(e) => updateField("username", e.target.value)}
            className={inputStyle}
            type="text"
            name=""
            id=""
            defaultValue={user.username}
            />
        </div>
        <div className="flex flex-col">
          <span>Email:</span>
          <input
            onChange={(e) => updateField("email", e.target.value)}
            className={inputStyle}
            type="text"
            name=""
            id=""
            defaultValue={user.email}
            />
        </div>
        <div className="flex flex-col">
          <span>Nr. telefon:</span>
          <input
            onChange={(e) => updateField("nrTelefon", e.target.value)}
            className={inputStyle}
            type="text"
            name=""
            id=""
            defaultValue={user.phone}
            />
        </div>
        <div className="flex flex-col">
          <span>Data nașterii:</span>
          <input
            onChange={(e) => updateField("dataNasterii", e.target.value)}
            className={inputStyle}
            type="date"
            name=""
            id=""
            defaultValue={user.dataNasterii?.split("T")[0]}
            />
        </div>
            </div>
        <button onClick={() => updateData()} 
        className="cursor-pointer bg-rose-500 text-white p-2 rounded-xs">
          Salvează modificările
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
