import { useEffect, useState } from "react";
import axios from 'axios';
import CardAbonamentAdmin from "./cardAbonamentAdmin/cardAbonamentAdmin";

const API_URL = import.meta.env.VITE_BACKEND_URL

function ListaAbonamente(){
    const [data, setData] = useState([]);

    async function getData(){
        let response = await axios.get(`${API_URL}/abonamente`);
        setData(response.data);
        console.log(response.data);
    }
    useEffect(() => {
        getData()
    }, [])

    return <div>
        {data.map((abonament) => {
            return <CardAbonamentAdmin
            data={abonament}
            />
        })}
    </div>
}

export default ListaAbonamente;