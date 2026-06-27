import ListaAbonamenteProfil from "./listaAbonamenteProfil";
import ListaClaseProfil from "./clase/listaClaseProfil";
import { AuthContext } from "../../../../../../context/AuthContext";
import { useContext } from "react";

function WrapperAbonamente(){
  const { user } = useContext(AuthContext);

    return <div className="w-full min-h-screen flex flex-col gap-5 pt-25 pb-30">
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