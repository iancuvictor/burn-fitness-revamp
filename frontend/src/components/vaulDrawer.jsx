import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Drawer } from 'vaul';
import { AuthContext } from '../context/AuthContext';
 
export default function VaulDrawer({filtre, setFiltre}) {
    const {selectors} = useContext(AuthContext);
  return (
    <Drawer.Root >
      <Drawer.Trigger className="bg-black text-white text-[14px] h-fit p-2 rounded-md">Filtre <FontAwesomeIcon icon={faFilter}/></Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="w-full font-finlandica fixed bottom-0 left-0 right-0 h-fit bg-white
        flex flex-col items-center p-5 rounded-t-3xl gap-10">
          <h1 className="font-[700] text-[20px]">FILTRE</h1>
          <div className='w-full flex flex-row gap-2'>
            <h1 className="font-[700] text-[16px]">ANTRENOR:</h1>
            <div className='relative'>
            <input onChange={(e) => setFiltre({...filtre, antrenor: e.target.value})} type="text" name="" id="" className='peer shadow-md p-2 '/>
            <div className='absolute left-0 w-full bg-white border
            peer-focus:flex peer-focus:animate-fade-in hidden duration-150 ease-out flex-col'>
                {selectors.antrenori.filter((antrenor) => antrenor.numeAntrenor.toLowerCase().includes(filtre.antrenor.toLowerCase()))
                .map((antrenor) => {
                    return <div onMouseDown={() => setFiltre({...filtre, antrenor: antrenor.numeAntrenor})}
                    className='pl-3 pr-3 pt-2 pb-2'>{antrenor.numeAntrenor}</div>
                })}
            </div>
                </div>
          </div>
          <div className='w-full flex flex-row gap-2'>
            <h1 className="font-[700] text-[16px]">CLASA:</h1>
            <div className='w-full flex flex-col gap-2 overflow-auto h-20'>
                {selectors.clase.map((clasa) => {
                    return <div onMouseDown={() => setFiltre({...filtre, clasa: clasa.numeClasa})}>{clasa.numeClasa}</div>
                })}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}