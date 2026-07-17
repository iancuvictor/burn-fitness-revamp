import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CardListaAbonamente from "../../userPages/components/profilePage/components/abonamente/cardListaAbonamente"
import { faFloppyDisk, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CardListaClase from "../../userPages/components/profilePage/components/abonamente/clase/cardListaClase";

const API_URL = import.meta.env.VITE_BACKEND_URL
const inputStyle = `ring-1 pl-1 pr-1 rounded-xs min-w-50 field-sizing-content`

export default function UserEditScreen({ user, editScreen, setEditScreen }) {
    const [formData, setFormData] = useState(user)

    console.log(formData);

    return <div className="fixed top-0 left-0 z-2 h-full w-full flex items-center justify-center pt-5 pb-5 pl-10 pr-10
     bg-black/80 font-finlandica">
        <div className="relative bg-white h-full w-300 rounded-lg p-5 flex flex-col justify-between gap-5">
            <div className="overflow-y-scroll p-2">
                <div className="flex gap-10 items-center h-50">
                    <span className="h-50 w-50">
                        <img className="object-cover object-center w-full h-full rounded-full"
                            src={`${formData.profilePhoto}?t=${Date.now()}`} alt="" />
                    </span>
                    <div className="flex flex-col justify-between gap-2 text-[14px] font-[600] h-full">
                        <span className="flex gap-1">
                            <input onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                value={formData.username} className={inputStyle} />
                        </span>
                        <span className="flex gap-1">
                            <input onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                value={formData.email} className={inputStyle} />
                        </span>
                        <span className="font-[600]">Nr. Telefon: <input onChange={(e) => setFormData({ ...formData, nrTel: e.target.value })}
                            value={formData.phone} /></span>
                        <span className="font-[600]">Data nașterii: <input type='date'
                            onChange={(e) => setFormData({ ...formData, dataNasterii: e.target.value })}
                            value={formData.dataNasterii?.split("T")[0]} /></span>
                        <span className="font-[600]">Data absolvire <span className="font-[400]">[Pentru reducerea de student]:</span></span>
                        <input type="date" value={formData.dataAbsolvireStudent?.split("T")[0]} />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-[18px] font-[600]">Abonamente active:</span>
                    <div className="flex flex-row gap-2">
                        {formData.activeSubscriptions.map((abonament, index) => {
                            return <CardListaAbonamente dataAbonament={abonament} key={index} />
                        })}
                        <button className="bg-rose-500 p-3 h-fit cursor-pointer text-white">
                            <FontAwesomeIcon icon={faPlus} />Adaugă abonament</button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[18px] font-[600]">Clase active:</span>
                        <div className="flex flex-row gap-2">
                            {formData.activeClasses.map((clasa, index) => {
                                return <CardListaClase clasa={clasa} key={index} />
                            })}
                            <button className="bg-rose-500 p-3 h-fit cursor-pointer text-white">
                                <FontAwesomeIcon icon={faPlus} />Înscrie la clasă</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full">
                <button onClick={() => setEditScreen(false)}
                className="cursor-pointer bg-green-600 text-white w-fit p-2">
                <FontAwesomeIcon icon={faFloppyDisk} /> Salvează modificările
            </button>
            <button onClick={() => setEditScreen(false)}
                className="cursor-pointer bg-rose-500 text-white w-fit p-2">
                <FontAwesomeIcon icon={faXmark} /> Renunță
            </button>
            </div>
        </div>
    </div>
}