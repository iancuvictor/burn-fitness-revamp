import { useContext, useEffect, useRef, useState, } from "react";
import { useParams } from "react-router"
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import CardClasaOrar from "../../saliDeFitness/orar/cardClasaOrar";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function PaginaClase() {
    const { idClasa } = useParams();
    const { selectors, getSelectors, isAdmin } = useContext(AuthContext)
    let clasa = selectors.clase.find((clasa) => clasa._id === idClasa);

    const [dataClase, setDataClase] = useState([]);

    const [data, setData] = useState(clasa);
    const uploadImage = useRef(null);
    const updatePage = async () => {
        let sentData = new FormData();
        sentData.append('id', idClasa);
        sentData.append('nume', data.nume);
        sentData.append('descriere', data.descriere);
        sentData.append('imagine', data.imagine);
        await axios.put(`${API_URL}/classes/clasa`, sentData, { withCredentials: true });
        await getSelectors()
    }

    async function getData() {
            let response = await axios.get(
                `${API_URL}/classes/orarClase?clasa=${clasa.nume}`,
            );
            setDataClase(response.data);
            console.log(dataClase);
        }

    useEffect(() => {
        setTimeout(() => {
            getData()
        }, 100);
    }, [])


    if (isAdmin) {
        return <div className="flex flex-col items-center min-h-[calc(100vh-5rem)] bg-white font-finlandica pt-10">
            <div className="flex justify-center flex-row gap-20 w-full">
                <div className="flex flex-col gap-5 w-xl">
                    <div className="flex flex-col gap-2">
                        {JSON.stringify(data) !== JSON.stringify(clasa) && <div className="flex gap-2 h-full">
                            <button onClick={() => updatePage()}
                                className="cursor-pointer bg-rose-500 text-white p-2">Salvează modificările</button>
                            <button onClick={() => setData(clasa)}
                                className="cursor-pointer bg-white-500 text-black shadow-md/20 p-2">Resetează</button>
                        </div>}
                        <input onChange={(e) => setData({ ...data, nume: e.target.value })}
                            className="text-[30px] font-[700] field-sizing-content w-fit pl-1 pr-1 ring-2 ring-black outline-none" 
                            value={data?.nume} />
                    </div>
                    <textarea onChange={(e) => setData({ ...data, descriere: e.target.value })}
                        className="field-sizing-content w-full pl-1 pr-1 outline-none " value={data?.descriere} />
                </div>
                <div className="h-100 w-100">
                    <img onClick={() => uploadImage.current.click()} src={`${API_URL}/uploads/POZECLASE/${data?.imagine}?t=${Date.now()}`} alt="imagine clasa"
                        className="cursor-pointer h-full w-full rounded-md object-cover object-center" />
                    <input ref={uploadImage} type="file" onChange={(e) => setData({ ...data, imagine: e.target.files[0] })}
                        className="hidden" />
                </div>
            </div>
        </div>
    } else {
        return <div className="flex flex-col items-center min-h-[calc(100vh-5rem)] bg-white font-finlandica pt-10 pb-10">
            <div className="flex justify-center flex-row gap-20 w-full">
                <div className="flex flex-col gap-5 w-md">
                    <h1 className="text-[30px] font-[700]">{clasa?.nume}</h1>
                    <p className="field-sizing-content">{clasa?.descriere}</p>
                </div>
                <div className="h-100 w-100">
                    <img src={`${API_URL}/uploads/POZECLASE/${clasa?.imagine}?t=${Date.now()}`} alt="imagine clasa"
                        className="h-full w-full rounded-md object-cover object-center" />
                </div>
                <div>
                <h1 className="text-[30px] font-[700]">Clase disponibile:</h1>
                <div className="flex flex-col gap-2 w-fit">
                {dataClase.length > 0 ? dataClase.map((clasa, index) => {
                    return <CardClasaOrar clasa={clasa} getOrar={getData} key={index} filtre={selectors}/>
                }) : <span>Nu există clase de {clasa.nume} programate</span>}
                </div>
                </div>
            </div>
        </div>
    }
}