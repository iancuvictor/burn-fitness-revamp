import ListaAbonamenteProfil from "./listaAbonamenteProfil";
import ListaClaseProfil from "./clase/listaClaseProfil";
import { AuthContext } from "../../../../../../context/AuthContext";
import { useContext } from "react";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import axios from 'axios';
import {toast} from 'sonner';

const API_URL = import.meta.env.VITE_BACKEND_URL;

function WrapperAbonamente(){
  const { user } = useContext(AuthContext);
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');

  useEffect(() => {
    async function checkSessionForToast(){
      if(sessionId !== null){
        try{
          let response = await axios.post(`${API_URL}/payments/checkSession`, {sessionId: sessionId}, {withCredentials: true})
          console.log(response.data);
          if(response.data.toast === 'success'){
            toast.success(`Abonamentul a fost adăugat cu succes!`)
          } else if(response.data.toast === 'error'){
            toast.error(`Abonamentul nu a fost adăugat`)
          }
        } catch(err) {
          console.log(err.response.data);
        }
      }
    }
    checkSessionForToast();
    }, [])

    let availableClasses = user.activeClasses?.filter((clasa) => new Date(clasa.date) > new Date())

    return <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col gap-5 pt-5 pb-30 pr-10 pl-10">
        <div className="w-full flex flex-col gap-2">
          <h1 className="font-[700] text-[20px]">Abonamente active: ({user.activeSubscriptions.length})</h1>
          <ListaAbonamenteProfil data={user.activeSubscriptions}/>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="font-[700] text-[20px]">Clase programate: ({availableClasses.length})</h1>
          <ListaClaseProfil data={availableClasses}/>
        </div>
      </div>
}

export default WrapperAbonamente;