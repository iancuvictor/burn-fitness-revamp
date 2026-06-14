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
    <div className="flex flex-col items-center">
      <div>
        <div
          className={`${displayedMenus.popUpAddAbonament ? "flex" : "hidden"} fixed`}
        >
          <PopUpAddAbonament
            displayedMenus={displayedMenus}
            setDisplayedMenus={setDisplayedMenus}
          />
        </div>
        <h1>Abonamente</h1>
        <button
          onClick={() =>
            setDisplayedMenus({ ...displayedMenus, popUpAddAbonament: true })
          }
          className="cursor-pointer"
          >
          Creează abonament
        </button>
            <div>
                <ListaAbonamente/>
            </div>
      </div>
    </div>
  );
}

export default AdminAbonamente;
