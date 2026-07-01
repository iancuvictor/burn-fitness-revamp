import { AuthContext } from "../../../../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import TemporaryPopUp from "../../../../popUps/temporaryPopUp";
import { toast } from "sonner";

const inputWrapper =
  "text-black text-[14px] border rounded-md box-content pt-2 pb-2 pl-3 pr-3 md:pl-5 md:pr-5";
const inputStyle = "w-full outline-none";
const API_URL = import.meta.env.VITE_BACKEND_URL;

function AccountSettings() {
  const { user, refreshUser } = useContext(AuthContext);
  const uploadImage = useRef(null);

  const [formData, setFormData] = useState({
    username: user.username,
    displayName: user.displayName || "",
    email: user.email,
    nrTelefon: user.phone,
    password: "",
    confirmPassword: "",
    dataNasterii: user.dataNasterii || "",
    pozaProfil: user.profilePhoto || "",
  });

  const updateData = async () => {
    let data = new FormData();
    data.append("username", formData.username);
    data.append("displayName", formData.displayName);
    data.append("email", formData.email);
    data.append("nrTelefon", formData.nrTelefon);
    data.append("dataNasterii", formData.dataNasterii);
    data.append("pozaProfil", formData.pozaProfil);
    try {
      await axios.post(`${API_URL}/users/updateProfile`, data, {
        withCredentials: true,
      });
      toast.success("Datele au fost actualizate!");
    } catch (err) {
      console.log(err);
    }
  };

  const changePassword = async () => {
    if (formData.password === formData.confirmPassword) {
      try {
        let response = await axios.post(
          `${API_URL}/users/updatePassword`,
          { password: formData.password },
          { withCredentials: true },
        );
        toast.success("Parola a fost schimbată");
      } catch {
        toast.error("A intervenit o eroare");
      }
    } else {
      console.log("wrong");
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    refreshUser();
    updateData();
  }, [formData.pozaProfil]);

  return (
    <div className="min-h-screen flex flex-col items-center gap-2 pt-5 pb-20 pr-5 pl-5 w-full ">
      <div className="w-full md:w-100 flex flex-col gap-5">
        <h1 className="font-[700] text-[20px]">Gestionează contul</h1>
        <div className="flex flex-col gap-2">
          <div
            className="flex gap-5
        md:flex-col"
          >
            <div className="flex flex-col gap-3 items-center justify-center ">
              <div
                className="relative flex items-center w-30 h-30 
            md:h-40 md:w-40"
              >
                <img
                  src={`${API_URL}/uploads/POZEPROFIL/${user.profilePhoto}?t=${Date.now()}`}
                  alt="poza profil"
                  className=" cursor-pointer object-cover object-center w-full h-full rounded-full ring-1 active:shadow-md/50"
                  onClick={() => uploadImage.current.click()}
                />
              </div>
              <button
                onClick={() => uploadImage.current.click()}
                className="cursor-pointer bg-rose-500 text-white text-[15px] pt-1 pb-1 pl-2 pr-2 rounded-md
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
            <div className="flex flex-col gap-2">
              <div className={inputWrapper}>
                <span className="text-[12px]">
                  [Pentru clase] Nume utilizator:
                </span>
                <input
                  onChange={(e) => updateField("displayName", e.target.value)}
                  className={inputStyle}
                  type="text"
                  name=""
                  id=""
                  defaultValue={user.displayName}
                />
              </div>
              <div className={inputWrapper}>
                <span>Nume cont:</span>
                <input
                  onChange={(e) => updateField("username", e.target.value)}
                  className={inputStyle}
                  type="text"
                  name=""
                  id=""
                  defaultValue={user.username}
                />
              </div>
              <div className={inputWrapper}>
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
            </div>
          </div>
          <div className={inputWrapper}>
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
          <div className={inputWrapper}>
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
        <button
          onClick={() => updateData()}
          className="cursor-pointer bg-rose-500 text-white p-2 rounded-xs"
        >
          Salvează modificările
        </button>
        <div className="flex flex-col gap-2">
          <h1 className="font-[700] text-[20px]">Schimbă parola:</h1>
          <div className={inputWrapper}>
            <span>Parolă nouă:</span>
            <input
              onChange={(e) => updateField("password", e.target.value)}
              className={inputStyle}
              type="password"
              name=""
              id=""
            />
          </div>
          <div className={inputWrapper}>
            <span>Confirmă parola nouă:</span>
            <input
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className={inputStyle}
              type="password"
              name=""
              id=""
            />
          </div>
        </div>
        <button
          onClick={() => changePassword()}
          className="cursor-pointer bg-rose-500 text-white p-2 rounded-xs"
        >
          SCHIMBĂ PAROLA
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
