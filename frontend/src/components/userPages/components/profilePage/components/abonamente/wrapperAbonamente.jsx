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
          if(response.data.toast === 'success'){
            toast.success(`Abonamentul a fost adăugat cu succes!`)
          }
        } catch(err) {
          console.log(err.response.data);
        }
      }
    }
    checkSessionForToast();
    }, [])

    return <div className="w-full min-h-screen flex flex-col gap-5 pt-5 pb-30 pr-5 pl-5">
        <div className="w-full flex flex-col gap-2">
          <h1 className="font-[700] text-[20px]">Abonamente active: ({user.activeSubscriptions.length})</h1>
          <ListaAbonamenteProfil data={user.activeSubscriptions}/>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="font-[700] text-[20px]">Clase programate: ({user.activeClasses.length})</h1>
          <ListaClaseProfil data={user.activeClasses}/>
        </div>
      </div>
}

export default WrapperAbonamente;