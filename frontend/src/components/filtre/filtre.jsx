import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Filtre({ filtre, setFiltre}) {
    const { selectors } = useContext(AuthContext);
    const filtreMenu = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(filtreMenu.current && !filtreMenu.current.contains(e.target)) {
                setFiltre(prev => ({...prev, open: false}));
            }
            console.log(filtre);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    return <div className={`flex fixed top-0 left-0 h-full w-full items-center justify-center bg-black/40
                            pl-2 pr-2`}>

        <div ref={filtreMenu} className="flex flex-col items-center gap-2 bg-white p-5 rounded-xl shadow-xl  w-full md:w-200">
            <h1 className="font-[700] text-[20px]">FILTRE</h1>
            <div className='w-full md:w-100 flex flex-col justify-between gap-2'>
                <h1 className="font-[700] text-[16px]">ANTRENOR:</h1>
                <div className='relative w-full'>
                    <span className="ring-1 pl-2 peer flex items-center">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input onChange={(e) => setFiltre({ ...filtre, antrenor: e.target.value })} type="text" value={filtre.antrenor}
                            placeholder='Nume antrenor'
                            className='peer p-2 outline-none w-fit' />
                    </span>
                    <div className='w-full z-1 absolute left-0 bg-white ring-1
            peer-focus-within:flex peer-focus-within:animate-fade-in hidden duration-150 ease-out flex-col'>
                        {selectors.antrenori.filter((antrenor) => antrenor.numeAntrenor?.toLowerCase().includes(filtre.antrenor?.toLowerCase()))
                            .map((antrenor, index) => {
                                return <div key={index} onMouseDown={() => setFiltre({ ...filtre, antrenor: antrenor.numeAntrenor })}
                                    className='w-full cursor-pointer pl-3 pr-3 pt-2 pb-2 duration-75 ease-out'>{antrenor.numeAntrenor}</div>
                            })}
                    </div>
                </div>
            </div>
            <div className='w-full md:w-100 flex flex-col justify-between gap-2'>
                <h1 className="font-[700] text-[16px]">CLASA:</h1>
                <div className='relative'>
                    <span className="ring-1 pl-2 peer flex items-center">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input onChange={(e) => setFiltre({ ...filtre, clasa: e.target.value })} type="text" value={filtre.clasa}
                        placeholder='Nume clasă'
                        className='peer p-2 outline-none w-fit' />
                        </span>
                    <div className='z-1 left-0 w-full bg-white ring-1
            peer-focus-within:flex peer-focus-within:animate-fade-in hidden duration-150 ease-out flex-col'>
                        {selectors.clase.filter((clasa) => clasa.numeClasa?.toLowerCase().includes(filtre.clasa?.toLowerCase()))
                            .map((clasa, index) => {
                                return <div key={index} onMouseDown={() => setFiltre({ ...filtre, clasa: clasa.numeClasa })}
                                    className='cursor-pointer pl-3 pr-3 pt-2 pb-2'>{clasa.numeClasa}</div>
                            })}
                    </div>
                </div>
            </div>
            <button onClick={() => {
                toast.success('Filtrele au fost șterse');
                setFiltre({ ...filtre, antrenor: '', clasa: '' })
            }}
                className={`${filtre.clasa !== '' || filtre.antrenor !== '' ? 'flex' : 'hidden' } cursor-pointer bg-rose-500 text-white p-3 w-full rounded-md`}>Șterge filtrele</button>
        </div>
    </div>
}

