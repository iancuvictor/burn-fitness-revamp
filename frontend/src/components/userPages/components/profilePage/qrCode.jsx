import { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

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

    console.log(qrCode);

    if(qrCode === undefined){
        return <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-5rem)] bg-black">
            <FontAwesomeIcon icon={faCircleNotch} className="text-[30px] text-white" spin/>
        </div>
    } else {   
        return <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-5rem)]
        bg-black text-white font-finlandica">
        <div className="relative w-50 flex flex-col items-center justify-center gap-5">
        <h1 className="absolute top-[-60px] text-center font-[700]">Prezintă codul QR la recepție</h1>
        <img src={qrCode} alt="qrCode" className="ring-1 ring-black shadow-xl"/>
        </div>

    </div>
    }
}