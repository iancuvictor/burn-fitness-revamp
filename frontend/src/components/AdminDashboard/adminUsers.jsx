import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function AdminUsers(){
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        async function getUsers(){
            let response = await axios.get(`${API_URL}/users`, { withCredentials: true });
            let userArray = response.data;
            setUserList(userArray)
        }
        getUsers();
    }, []);

    const fetchUsers = async () => {
            let response = await axios.get(`${API_URL}/users`, { withCredentials: true });
            let userArray = response.data;
            setUserList(userArray)
    }

    console.log(userList);


    return <div className="flex flex-col items-center w-full bg-white min-h-screen">
        <h1>Listă clienți</h1>
        <div>

        <div>
            {userList.map((user) => {
                if(user.isAdmin === false){
                    return <div className="flex flex-col">
                    <h1>{user.username}</h1>
                    <span>{user.email}</span>
                    <span>{user.phone}</span>
                    </div>
                }
            })}
        </div>

        <button onClick={() => fetchUsers()} className="cursor-pointer bg-red-300">Refresh</button>
            </div>
    </div>
}

export default AdminUsers;