import { useEffect, useState } from "react";
import axios from 'axios';
import CardAbonamentAdmin from "./cardAbonamentAdmin/cardAbonamentAdmin";

const API_URL = import.meta.env.VITE_BACKEND_URL

function ListaAbonamente(){
    const [data, setData] = useState([]);

    async function getData(){
        let response = await axios.get(`${API_URL}/abonamente`);
        setData(response.data);
    }
    useEffect(() => {
        getData()
    }, [])

    return <div className="min-h-screen w-full">
        <div className="w-full grid grid-cols-3 gap-5">

        {data.map((abonament, index) => {
            return <CardAbonamentAdmin
            data={abonament}
            key={index}
            getData={getData}
            />
        })}
        </div>
    </div>
}

export default ListaAbonamente;