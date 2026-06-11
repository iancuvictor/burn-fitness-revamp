import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function SalaFitnessZorilor(){
    const [dataOrar, setDataOrar] = useState([]);

    useEffect(() => {
        async function getOrar(){
            let response = await axios.get(`${API_URL}/classes/orarClase`);
            console.log(response.data);
            setDataOrar(response.data);
        }

        getOrar();
    });


    return <div className="min-h-screen">
        <h1>Sala fitness zorilor</h1>
        <h1>Orar clase</h1>
        <div>
            {dataOrar.map((clasa) => {
                if(clasa.locatie === 'zorilor'){
                    return <div className="flex gap-2">
                    <span>{clasa.zi}</span>
                    <span>{clasa.ora}</span>
                    <span>{clasa.denumire}</span>
                    <span>{clasa.antrenor}</span>
                </div>
                }
            })}
        </div>

    </div>
}

export default SalaFitnessZorilor;