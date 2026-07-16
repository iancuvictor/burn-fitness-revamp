import axios from "axios"
import { useState } from "react"
import { toast } from "sonner";

const inputStyle = `border rounded-xs gap-2 pl-1 pr-1`
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminReviewuri() {
    const [data, setData] = useState({
        sala: '',
        nume: '',
        comentariu: '',
        nrStele: ''
    })

    const postReview = async () => {
        try{
            await axios.post(`${API_URL}/publicPages/reviews`, data, {withCredentials: true})
            toast.success(`Recenzia a fost postată cu succes`);
        } catch(err) {
            toast.error(`A apărut o eroare în postarea recenziei`);
        }
    }

    return <div className="min-h-[calc(100vh-5rem)] bg-white font-finlandica flex flex-col items-center pt-5">
        <h1 className="text-[20px] font-[700]">Administrează recenziile</h1>
        <div className="shadow-md/20 p-5 rounded-md flex flex-col gap-2 w-100">
            <span className="text-[18px] font-[600]">Adaugă recenzie</span>
            <div className="flex flex-col gap-2">
                <span className="flex flex-col">
                    <span>Sala:</span>
                    <input onChange={(e) => setData({...data, sala: e.target.value})} type="text" name="" id="" className={inputStyle} />
                </span>
                <span className="flex flex-col">
                    <span>Numele persoanei:</span>
                    <input onChange={(e) => setData({...data, nume: e.target.value})} type="text" name="" id="" className={inputStyle} />
                </span>
                <span className="flex flex-col">
                    <span>Comentariu:</span>
                    <textarea onChange={(e) => setData({...data, comentariu: e.target.value})} type="text" name="" id="" className={inputStyle} />
                </span>
                <span className="flex flex-col">
                    <span>Număr de stele:</span>
                    <input onChange={(e) => setData({...data, nrStele: e.target.value})} type="number" min='0' max='5' name="" id="" className={inputStyle} />
                </span>
            </div>
            <button onClick={() => postReview()}
             className="cursor-pointer bg-rose-500 p-2 text-white w-full rounded-md">Postează recenzia</button>
        </div>
    </div>
}