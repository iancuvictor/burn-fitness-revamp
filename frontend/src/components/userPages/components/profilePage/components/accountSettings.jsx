const inputStyle = "w-full outline rounded-xs pl-2 pt-1 pb-1 pr-2"
import { AuthContext } from "../../../../../context/AuthContext";
import { useContext, useState } from "react";
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

function AccountSettings(){
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    nrTelefon: user.phone,
    dataNasterii: user.dataNasterii || '',
    pozaProfil: user.profilePhoto || ''
  })

  const updateData = async () => {
    let data = new FormData();
    data.append('username', formData.username)
    data.append('email', formData.email)
    data.append('nrTelefon', formData.nrTelefon)
    data.append('dataNasterii', formData.dataNasterii),
    data.append('pozaProfil', formData.pozaProfil)
    console.log('test');
    try{
      await axios.post(`${API_URL}/users/updateProfile`, data, {withCredentials: true});
    } catch(err) {
      console.log(err)
    }
  }

  const updateField = (field, value) => {
    setFormData({...formData, [field] : value})
  }

    return <div className="min-h-screen flex flex-col gap-5 pt-15 md:pt-20 pb-20 w-full ">
      <h1 className="font-[700] text-[20px]">Gestionează contul</h1>
    <div className="flex flex-col shadow-md p-5 w-full md:w-100 overflow-hidden">
      <div className="flex flex-col">
        <img src={`${API_URL}/uploads/POZEPROFIL/${user.profilePhoto}`} alt="poza profil"
        className="w-50 rounded-full" />
        <input type="file" onChange={(e) => updateField('pozaProfil', e.target.files[0])} />
      </div>
      <div className="flex flex-col">
              <span>Nume:</span>
              <input
              onChange={(e) => updateField('username', e.target.value)}
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
              onChange={(e) => updateField('email', e.target.value)}
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
              onChange={(e) => updateField('nrTelefon', e.target.value)}
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
              onChange={(e) => updateField('dataNasterii', e.target.value)}
                className={inputStyle}
                type="date"
                name=""
                id=""
                defaultValue={new Date(user.dataNasterii).toLocaleDateString()}
                />
            </div>
            <button onClick={() => updateData()} className="cursor-pointer">Salvează modificările</button>
          </div>
                </div>
}

export default AccountSettings;