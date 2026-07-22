import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UserEditScreen from "./userEditScreen";
import defaultImage from '../../../media/default-avatar.jpg';
import axios from "axios";
import { toast } from "sonner";


const API_URL = import.meta.env.VITE_BACKEND_URL

export default function UserCard({ user }) {
    const [editScreen, setEditScreen] = useState(false);

    const deleteUser = async () => {
        try{
            let res = await axios.delete(`${API_URL}/users/deleteUser?id=${user._id}`, {withCredentials: true});
            toast.success(`Utilizatorul cu numele: ${user.username} a fost șters!`)
        } catch(err) {
            toast.error(`A intervenit o eroare în ștergerea utilizatorului`);
            console.log(err);
        }
    }

    return <div className="relative flex flex-col w-full min-h-fit rounded-md shadow-md p-2">
        <div>
            {editScreen && <UserEditScreen user={user} editScreen={editScreen} setEditScreen={setEditScreen} />}
        </div>
        <div className="flex gap-2 items-center">
            <span className="w-15 h-15">
                <img className="object-cover object-center w-full h-full rounded-full"
                    src={user.profilePhoto ? `${user.profilePhoto}?t=${Date.now()}` : defaultImage} alt="" />
            </span>
            <div className="flex flex-col text-[14px] font-[600]">
                <span className="flex gap-1">{user.username}</span>
                <span className="flex gap-1">{user.email}</span>
            </div>
            <div className="absolute top-0 right-0 p-3 flex flex-row gap-2 bg-white rounded-xs">
            <button className="cursor-pointer text-blue-500" onClick={() => setEditScreen(true)}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button onClick={() => deleteUser()} className="cursor-pointer text-rose-500">
                <FontAwesomeIcon icon={faTrash} />
            </button>
            </div>
        </div>
        <div className="text-[14px] flex flex-col">
            <span className="font-[600]">Nr. Telefon: {user.phone !== 'undefined' || undefined ? user.phone : 'Nu are setat nr. de telefon'}</span>
            <span className="font-[600]">Data nașterii: {" "}
                {new Date(user.dataNasterii).toLocaleDateString('ro-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="font-[600]">Data absolvire <span className="font-[400]">[Pentru reducerea de student]:</span></span>
            <span>{user.dataAbsolvireStudent? user.dataAbsolvireStudent?.split("T")[0] : 'Data nu este setată'}</span>
        </div>
    </div>
}