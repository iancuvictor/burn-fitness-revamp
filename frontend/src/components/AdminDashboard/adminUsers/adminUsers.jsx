import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import UserCard from "./userCard";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function AdminUsers() {
    const [userList, setUserList] = useState([]);
    const [filters, setFilters] = useState({
        filterBar: '',
    })

    useEffect(() => {
        async function getUsers() {
            let response = await axios.get(`${API_URL}/users`, { withCredentials: true });
            let userArray = response.data;
            setUserList(userArray)
        }
        getUsers();
    }, []);

    const fetchUsers = async () => {
        try{
            let response = await axios.get(`${API_URL}/users`, { withCredentials: true });
            let userArray = response.data;
            setUserList(userArray)
            toast.success(`Datele au fost actualizate cu succes`);
        } catch(err){
            toast.error(`A intervenit o eroare`);
        }
    }

    return <div className="relative flex flex-col min-h-[calc(100vh-5rem)] items-start w-full h-full bg-white p-5 gap-5">
        <div className="sticky top-0 flex flex-row gap-1 items-center">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input onChange={(e) => setFilters({...filters, filterBar: e.target.value})} type="text"
            className="w-80 rounded-xs ring-1 ring-gray-500 outline-none border-none pl-2 pr-2 pt-1 pb-1"
            value={filters.filterBar} placeholder="Introdu datele abonatului"/>
            <button onClick={() => fetchUsers()} className="cursor-pointer bg-rose-500 text-white p-2 rounded-md w-fit">Refresh</button>
        </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 wrap gap-4 p-4 overflow-y-scroll inset-shadow-sm inset-shadow-gray-300 rounded-md w-full">
                {userList.filter((user) => {
                    const searchTerm = filters.filterBar.toLowerCase().trim().split(' ').join('');
                    console.log(userList);

                    return user.username.toLowerCase().includes(searchTerm) ||
                           user.displayName.toLowerCase().includes(searchTerm) ||
                           user.email.toLowerCase().includes(searchTerm) ||
                           String(user.phone).includes(searchTerm)
                }).map((user) => {
                    if (user.isAdmin === false) {
                        return <UserCard user={user} key={user._id}/>
                    }
                })}
            </div>
    </div>
}

export default AdminUsers;