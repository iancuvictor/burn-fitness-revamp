import { useContext, useEffect, useRef, useState, } from "react";
import { useParams } from "react-router"
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import CardClasaOrar from "../../saliDeFitness/orar/cardClasaOrar";
import Markdown from 'react-markdown';
import MDEditor from '@uiw/react-md-editor';
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function PaginaClase() {
    const { idClasa } = useParams();
    const { selectors, getSelectors, isAdmin } = useContext(AuthContext)
    let clasa = selectors.clase.find((clasa) => clasa._id === idClasa);

    const [dataClase, setDataClase] = useState([]);
    // const [displayPreview, setDisplayPreview] = useState(false);

    const [data, setData] = useState(clasa);
    const uploadImage = useRef(null);
    const updatePage = async () => {
        let sentData = new FormData();
        sentData.append('id', idClasa);
        sentData.append('nume', data.nume);
        sentData.append('descriere', data.descriere);
        sentData.append('imagine', data.imagine);
        try{
            await axios.put(`${API_URL}/classes/clasa`, sentData, { withCredentials: true });
            await getSelectors()
            toast.success(`Pagina a fost actualizată cu succes!`)
        } catch(err) {
            toast.error(`A intervenit o eroare!`)
        }
    }

    async function getData() {
        let response = await axios.get(
            `${API_URL}/classes/orarClase?clasa=${clasa.nume}`,
        );
        setDataClase(response.data);
    }

    useEffect(() => {
        if (!clasa) return;
        getData();
    }, [clasa])

    console.log(`${clasa.imagine}?t=${Date.now()}`);

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
                    <div data-color-mode="light" className="w-full h-200">
                            <MDEditor
                                value={data?.descriere}
                                onChange={(value) => setData({...data, descriere: value})}
                                height={400}
                                />
                    </div>
                </div>
                <div className="h-100 w-100">
                    <img onClick={() => uploadImage.current.click()} src={`${clasa.imagine}?t=${Date.now()}`} alt="imagine clasa"
                        className="cursor-pointer h-full w-full rounded-md object-cover object-center" />
                    <input ref={uploadImage} type="file" onChange={(e) => setData({ ...data, imagine: e.target.files[0] })}
                        className="hidden" />
                </div>
            </div>
        </div>
    } else {
        return <div className="flex flex-col items-center min-h-[calc(100vh-5rem)] w-full bg-white font-finlandica p-10">
            <div className="flex justify-center flex-col md:flex-row gap-10 md:gap-20 w-full">
                <div className="flex flex-col gap-5 w-full md:w-xl">
                    <h1 className="text-[30px] font-[700]">{clasa?.nume}</h1>
                    <Markdown classname='w-full'>{clasa?.descriere}</Markdown>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="w-full md:h-100 md:w-100">
                        <img src={`${clasa.imagine}?t=${Date.now()}`} alt="imagine clasa"
                            className="h-full w-full rounded-md object-cover object-center" />
                    </div>
                    <div className="w-full relative pb-10">
                        <h1 className="text-[30px] font-[700]">Clase disponibile:</h1>
                        <div className="flex flex-col gap-2 p-1 w-full md:w-100 max-h-120 overflow-y-scroll [scrollbar-gutter:stable_both-edges]">
                            {dataClase.length > 0 ? dataClase.sort((a, b) => new Date(a.data) - new Date(b.data)).map((clasa, index) => {
                                return <CardClasaOrar clasa={clasa} getOrar={getData} key={index} filtre={selectors} />
                            }) : <span>Nu există clase de {clasa?.nume} programate</span>}
                        </div>
                        {/* <div className="z-1 absolute inset-0 bg-gradient-to-t from-white from-0% via-transparent via-20% to-transparent"></div> */}
                    </div>
                </div>
            </div>
        </div>
    }
}
{/* I won't reinvent the wheel now will i? */}
{/* <button onClick={() => setDisplayPreview(!displayPreview)}
    className="cursor-pointer bg-gray-300 text-[14px] rounded-md pl-2 pr-2 p-1">
    <FontAwesomeIcon icon={faEye} /> Preview ({displayPreview ? 'Viewing preview' : 'Viewing editor'})</button>
{displayPreview ? <Markdown>{data.descriere}</Markdown> :
    <textarea onChange={(e) => setData({ ...data, descriere: e.target.value })}
        className="field-sizing-content w-full pl-1 pr-1 outline-none " value={data?.descriere} />
} */}