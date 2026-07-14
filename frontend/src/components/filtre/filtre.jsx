import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faCheckCircle as faCheckCircleSolid } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faCheckCircleRegular } from '@fortawesome/free-regular-svg-icons';

export default function Filtre({ filtre, setFiltre }) {
    const { selectors } = useContext(AuthContext);
    const filtreMenu = useRef(null);
    const [filterUI, setFilterUI] = useState({
        antrenori: false,
        clase: false,
    })

    const seteazaFiltrele = (field, value) => {
        if(!filtre[field].includes(value)){
            setFiltre({...filtre, [field] : [...filtre[field], value]});
        } else {
            setFiltre({...filtre, [field]: filtre[field].filter((filtru) => filtru !== value)})
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filtreMenu.current && !filtreMenu.current.contains(e.target)) {
                setFiltre(prev => ({ ...prev, open: false }));
            }
        }
        document.body.style.overflow = 'hidden';
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        }
    }, [])

    console.log(filtre);

    return <div className={`fixed z-4 flex fixed top-0 left-0 h-full w-full items-center justify-center bg-black/40
                            pt-5 pb-5 pl-2 pr-2`}>

        <div ref={filtreMenu} className="font-finlandica animate-fade-in duration-400 ease-out relative h-fit w-full flex flex-col items-center gap-2 
        bg-white p-5 rounded-xl shadow-xl md:w-200">
            <h1 className="font-[700] text-[20px]">FILTRE</h1>
            <div className='relative w-full flex flex-col justify-between items-center gap-2'>
                <div className="w-full flex flex-col gap-2 items-start">
                    <div className="flex flex-col w-full">
                        <button onClick={() => setFilterUI({ ...filterUI, clase: !filterUI.clase, antrenori: false })}
                            className="cursor-pointer flex justify-between w-full font-[700] text-[16px]"><span>CLASE: </span><FontAwesomeIcon icon={filterUI.clase ? faCaretDown : faCaretUp} /></button>
                        <span className="text-[13px] text-gray-700 font-[400">
                            {filtre.clasa.map((filtru, index) => {
                                return <span key={index}>{filtru} | </span>
                            })}</span>
                    </div>
                    <div className='relative w-full'>
                        <div className={`${filterUI.clase ? 'flex h-50 ring-1' : 'h-0 ring-0'} z-1 overflow-scroll left-0 w-full bg-white
                    peer-focus-within:animate-fade-in duration-150 ease-out flex-col`}>
                            {selectors.clase.map((clasa, index) => {
                                    return <div key={index} onMouseDown={() => seteazaFiltrele('clasa', clasa.nume)}
                                        className={`${filtre.clasa.includes(clasa.nume) ? 'bg-rose-500 text-white' : 'bg-white'}
                                        cursor-pointer p-3 duration-75 ease-out text-[14px] flex justify-between`}>
                                        <span>{clasa.nume}</span>
                                        <FontAwesomeIcon icon={filtre.clasa.includes(clasa.nume) ? faCheckCircleSolid : faCheckCircleRegular} />
                                        </div>
                                })}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <button onClick={() => setFilterUI({ ...filterUI, antrenori: !filterUI.antrenori, clase: false })}
                            className="cursor-pointer flex justify-between w-full font-[700] text-[16px">
                            <span>ANTRENORI: </span>
                            <FontAwesomeIcon icon={filterUI.antrenori ? faCaretDown : faCaretUp} /></button>
                        <span className="text-[13px] text-gray-700 font-[400]">
                            {filtre.antrenor.map((filtru, index) => {
                                return <span key={index}>{filtru} | </span>
                            })}</span>
                    </div>
                    <div className='relative w-full'>
                        <div className={`${filterUI.antrenori ? 'flex h-50 ring-1' : 'h-0 ring-0'} w-full z-1 overflow-scroll left-0 bg-white
                            flex peer-focus-within:animate-fade-in duration-150 ease-out flex-col`}>
                            {selectors.antrenori
                                .map((antrenor, index) => {
                                    return <div key={index} onMouseDown={() => seteazaFiltrele('antrenor', antrenor.numeAntrenor)}
                                        className={`${filtre.antrenor.includes(antrenor.numeAntrenor) ? 'bg-rose-500 text-white' : 'bg-white'} 
                                        w-full cursor-pointer p-3 duration-75 ease-out text-[14px] flex justify-between`}>
                                        <span>{antrenor.numeAntrenor}</span>
                                        <FontAwesomeIcon icon={filtre.antrenor.includes(antrenor.numeAntrenor) ? faCheckCircleSolid : faCheckCircleRegular} />
                                        </div>
                                })}
                        </div>
                    </div>
                    <div>
                        <span className="flex items-center gap-1">
                            <span className="font-[500]">Vezi clasele care au expirat: </span>
                            <input onChange={(e) => setFiltre({...filtre, viewExpired: e.target.checked})} checked={filtre.viewExpired}
                             type="checkbox" className="accent-rose-500"/>
                        </span>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-100 flex flex-col justify-between gap-2'>
            </div>
            <button onClick={() => {
                toast.success('Filtrele au fost șterse');
                setFiltre({ ...filtre, antrenor: [], clasa: [] })
            }}
                className={`${filtre.clasa.length !== 0 || filtre.antrenor.length !== 0 ? 'p-3 opacity-100' : 'h-0 p-0 opacity-0'}
                 cursor-pointer bg-black text-white w-full rounded-md duration-300 ease-out`}>Șterge filtrele</button>
                 <button onClick={() => setFiltre({...filtre, open: false })}
                    className="cursor-pointer bg-rose-500 p-3 w-full rounded-md text-white">Închide filtrele</button>
        </div>
    </div>
}


