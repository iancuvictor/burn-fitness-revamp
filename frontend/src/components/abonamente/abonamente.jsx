import { useEffect, useState } from "react";
import CardAbonament from "./cardAbonament/cardAbonament";
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL
// const IMAGE_PATH = import.meta.env.VITE_FOLDER_UPLOADS_ABONAMENTE

function Abonamente() {
  const [data, setData] = useState([]);
  const [viewPreturi, setViewPreturi] = useState({
    viewPreturi: "default",
  });

  useEffect(() => {
    async function getData(){
      let response = await axios.get(`${API_URL}/abonamente`)
      setData(response.data);
    }
    getData();
  }, [])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full font-finlandica pt-20 pb-[100px] gap-5">
      <h1 className="text-[20px] text-white md:text-[35px] font-[700] pt-[30px] text-center">
        ABONAMENTELE BURN FITNESS CLUJ-NAPOCA
      </h1>
      <div className="text-[14px] md:text-[18px] text-white flex flex-col items-center gap-3">
            <div className="flex bg-redishPinkDark p-[10px] rounded-md">
            <span>Vezi preturile:</span>
            <select
              onChange={(e) =>
                setViewPreturi({ ...viewPreturi, viewPreturi: e.target.value })
              }
              name=""
              id=""
              className="cursor-pointer select-none outline-none"
              >
              <option value="basic" className="bg-black outline-none">
                basic (fără reducere)
              </option>
              <option value="studenti" className="bg-black outline-none">
                pentru studenți (13% REDUCERE)
              </option>
              <option value="familie" className="bg-black outline-none">
                pentru familie (-20% REDUCERE)
              </option>
            </select>
              </div>
            <span className={`${viewPreturi.viewPreturi === 'familie' ? 'opacity-100 h-5 pt-[5px] pb-[20px] md:pb-[5px]' : 'opacity-0 h-0 p-0'} 
            text-redishPinkDark font-[600] text-[14px] md:text-[18px] duration-150 ease-out text-center box-content`}>
              (minim un membru al familiei trebuie să aibe un
                abonament <span className="text-white underline underline-offset-4">ACTIV</span> pentru reducerea de familie)</span>
          </div>
      <div
        id="listaAbonamente"
        className="relative w-full flex flex-col flex-wrap items-center content-box justify-center gap-5"
      >
        <div id="abonamentePremium" className="relative w-full flex flex-row flex-wrap items-center justify-center gap-5">
          {data.map((abonament, index) => {
            if(abonament.tier === 'premium'){
              return <CardAbonament
              tier={abonament.tier}
              titlu={abonament.titlu}
              type='GOLD'
              desc={abonament.desc}
              preturi={abonament.preturi}
              viewPreturi={viewPreturi.viewPreturi}
              reducereAplicabila={abonament.reducereAplicabila}
              key={index}
              />
            }
          })}
        </div>
        <div id="abonamenteRegular" className="relative w-full flex flex-row 
        items-center justify-center flex-wrap gap-5 
        md:flex md:gap-10 md:flex-row md:flex-wrap md:justify-center 
        lg:w-250 lg:justify-items-center lg:grid lg:grid-cols-3">
          {data.map((abonament, index) => {
            if(abonament.tier === 'regular'){
              return <CardAbonament
              tier={abonament.tier}
              titlu={abonament.titlu}
              desc={abonament.desc}
              preturi={abonament.preturi}
              viewPreturi={viewPreturi.viewPreturi}
              reducereAplicabila={abonament.reducereAplicabila}
              key={index}
              />
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Abonamente;
