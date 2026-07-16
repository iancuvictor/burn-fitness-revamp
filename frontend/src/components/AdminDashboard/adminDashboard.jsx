import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const inputWrapper =
  "text-black text-[14px] border rounded-md box-content pt-2 pb-2 pl-3 pr-3 md:pl-5 md:pr-5";
const inputStyle = "w-full outline-none";
const API_URL = import.meta.env.VITE_BACKEND_URL;

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const [viewPassword, setViewPassword] = useState({
      password: false,
      confirmPassword: false,
    })

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
      });

    const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
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

  return (
    <div className="pl-60 bg-white w-full min-h-screen font-finlandica pt-[50px]">
      <h1 className="font-[700]">Conectat cu contul: {user.username}</h1>
      <div className="flex flex-col gap-2 w-100">
          <h1 className="font-[700] text-[20px]">Schimbă parola:</h1>
          <div className={inputWrapper}>
            <span>Parolă nouă:</span>
            <span className="flex items-center justify-center">
              <input
                onChange={(e) => updateField("password", e.target.value)}
                className={inputStyle}
                type={viewPassword.password ? 'text' : 'password'}
                name=""
                id=""
              />
              <FontAwesomeIcon onClick={() => setViewPassword({ ...viewPassword, password: !viewPassword.password })}
                icon={viewPassword.password ? faEye : faEyeSlash} className="cursor-pointer text-[18px]" />
            </span>
          </div>
          <div className={inputWrapper}>
            <span>Confirmă parola nouă:</span>
            <span className="flex items-center justify-center">
              <input
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                className={inputStyle}
                type={viewPassword.confirmPassword ? 'text' : 'password'}
                name=""
                id=""
              />
              <FontAwesomeIcon onClick={() => setViewPassword({ ...viewPassword, confirmPassword: !viewPassword.confirmPassword })}
                icon={viewPassword.confirmPassword ? faEye : faEyeSlash} className="cursor-pointer text-[18px]" />
            </span>
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

export default AdminDashboard;
