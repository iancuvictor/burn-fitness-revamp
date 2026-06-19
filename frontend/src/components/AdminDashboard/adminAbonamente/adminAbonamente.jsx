import axios from "axios";
import { useState, useEffect } from "react";
import PopUpAddAbonament from "./popUpAddAbonament/popUpAddAbonament";
import ListaAbonamente from "./listaAbonamente/listaAbonamente";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function AdminAbonamente() {
  const [displayedMenus, setDisplayedMenus] = useState({
    popUpAddAbonament: false,
  });

  useEffect(() => {
    async function getData() {
      let response = await axios.get(`${API_URL}/abonamente`);
    }

    getData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center font-finlandica bg-white pl-10 pr-10">
        <div
          className={`${displayedMenus.popUpAddAbonament ? "flex" : "hidden"} fixed`}
        >
          <PopUpAddAbonament
            displayedMenus={displayedMenus}
            setDisplayedMenus={setDisplayedMenus}
          />
        </div>
        <button
          onClick={() =>
            setDisplayedMenus({ ...displayedMenus, popUpAddAbonament: true })
          }
          className="cursor-pointer"
          >
          Creează abonament
        </button>
            <div>
              <h1 className="font-[700] text-[25px]">Listă Abonamente</h1>
                <ListaAbonamente/>
            </div>
    </div>
  );
}

export default AdminAbonamente;
