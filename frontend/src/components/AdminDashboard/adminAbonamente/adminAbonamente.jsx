import axios from "axios";
import { useState, useEffect } from "react";
import PopUpAddAbonament from "./popUpAddAbonament/popUpAddAbonament";
import ListaAbonamente from "./listaAbonamente/listaAbonamente";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function AdminAbonamente() {
  const [displayedMenus, setDisplayedMenus] = useState({
    popUpAddAbonament: false,
  });

  async function getData() {
      await axios.get(`${API_URL}/abonamente`);
    }

  useEffect(() => {

    getData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center font-finlandica bg-gray-100 pt-10 pl-10 pr-10">
        <div
          className={`${displayedMenus.popUpAddAbonament ? "flex" : "hidden"} z-2 fixed`}
        >
          <PopUpAddAbonament
            displayedMenus={displayedMenus}
            setDisplayedMenus={setDisplayedMenus}
            getData={getData}
          />
        </div>
            <div>
              <div className="flex items-center gap-2">
              <h1 className="font-[700] text-[25px]">Listă Abonamente</h1>
              <button
          onClick={() =>
            setDisplayedMenus({ ...displayedMenus, popUpAddAbonament: true })
          }
          className="cursor-pointer"
          >
          <FontAwesomeIcon className="text-[25px]" icon={faSquarePlus} />
        </button>
              </div>
                <ListaAbonamente/>
            </div>
    </div>
  );
}

export default AdminAbonamente;
