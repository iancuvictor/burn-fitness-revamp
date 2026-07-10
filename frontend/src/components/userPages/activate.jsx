import { useSearchParams } from "react-router";
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL

export default function Activate(){
    const [searchParams] = useSearchParams();
    const [response, setResponse] = useState();
    const token = searchParams.get('token');

    useEffect(() => {
        async function activateAccount(){
            try{
                let response = await axios.post(`${API_URL}/users/activate`, {token: token});
                setResponse(response);
            } catch {
                setResponse({status: 404});
            }
        }
        activateAccount();
    }, [])

    console.log(response)

    if(response !== undefined){
        if(response.status === 404){
            return <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-5 rounded-md">
        <h1>Utilizatorul nu există</h1>

        </div>
    </div>
    } else {
        return <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-5 rounded-md">
        <h1>Utilizatorul a fost activat!</h1>

        </div>
    </div>
    }
}
}