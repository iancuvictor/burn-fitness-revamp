import { useEffect, useState } from "react";
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function QrCode(){
    const [qrCode, setQrCode] = useState();

    useEffect(() => {
        async function getQrCode(){
            let response = await axios.get(`${API_URL}/users/profile/qrCode`, {withCredentials: true});
            let imageLink = response.data.imageUrl;
            setQrCode(imageLink);
        }

        getQrCode();
    }, [])

    return <div className="flex flex-col items-center justify-center w-full min-h-100
    bg-black text-white font-finlandica">
        <div className="w-50 flex flex-col items-center justify-center gap-5">
        <h1 className="text-center font-[700]">Prezintă codul QR la recepție</h1>
        <img src={qrCode} alt="qrCode" className="ring-1 ring-black shadow-xl"/>
        </div>

    </div>
}