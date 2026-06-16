import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import CardAbonament from "../../abonamente/cardAbonament/cardAbonament";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const infoBarTextStyle =
  "text-[20px] md:text-[30px] font-[700] text-white text-nowrap";

function AbonamenteAcasa() {
  const [data, setData] = useState([]);
  const [viewPreturi, setViewPreturi] = useState({
    viewPreturi: "default",
  });

  useEffect(() => {
    async function getData() {
      let response = await axios.get(`${API_URL}/abonamente`);
      setData(response.data);
    }
    getData();
  }, []);
  return (
    <div className="relative h-fit pb-10 w-full flex flex-col items-center overflow-hidden gap-5 font-finlandica">
      <div
        className="flex w-full justify-around gap-4
            animate-[infoBar_8s_linear_infinite_reverse]
            md:animate-[infoBar_20s_linear_infinite_reverse]"
      >
        <h1 className={infoBarTextStyle}>
          ABONAMENTELE
          <span className="text-redishPinkDark italic">
            {" "}
            BURN FITNESS CLUJ-NAPOCA
          </span>
        </h1>
        <h1 className={infoBarTextStyle}>
          ABONAMENTELE
          <span className="text-redishPinkDark italic">
            {" "}
            BURN FITNESS CLUJ-NAPOCA
          </span>
        </h1>
        <h1 className={infoBarTextStyle}>
          ABONAMENTELE
          <span className="text-redishPinkDark italic">
            {" "}
            BURN FITNESS CLUJ-NAPOCA
          </span>
        </h1>
        <h1 className={infoBarTextStyle}>
          ABONAMENTELE
          <span className="text-redishPinkDark italic">
            {" "}
            BURN FITNESS CLUJ-NAPOCA
          </span>
        </h1>
        <h1 className={infoBarTextStyle}>
          ABONAMENTELE
          <span className="text-redishPinkDark italic">
            {" "}
            BURN FITNESS CLUJ-NAPOCA
          </span>
        </h1>
      </div>
      <div>
        <div className="flex flex-col items-center gap-5">
          <div className="text-[14px] md:text-[18px] text-white flex flex-col items-center gap-3">
            <h1 className="text-[25px] font-[600]">Abonamente simple</h1>
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
          <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-20">
            {data.map((abonament, index) => {
              if (abonament.highlighted === true) {
                return (
                  <CardAbonament
                    tier={abonament.tier}
                    titlu={abonament.titlu}
                    type="GOLD"
                    desc={abonament.desc}
                    preturi={abonament.preturi}
                    key={index}
                    viewPreturi={viewPreturi.viewPreturi}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
      <NavLink to='/abonamente'className="cursor-pointer text-white bg-redishPinkDark text-[12px] p-3 md:text-[16px] md:p-5 rounded-md font-[500]
      hover:shadow-lg shadow-redishPinkDark/40 duration-100 ease-out">Vezi mai multe abonamente</NavLink>
    </div>
  );
}

export default AbonamenteAcasa;
