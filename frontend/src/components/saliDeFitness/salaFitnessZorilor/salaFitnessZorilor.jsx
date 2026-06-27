import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ZiOrar from "../orar/ziOrar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle as faCheckCircleSolid,
  faFilter,
  faSquareCaretLeft,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faCheckCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { VaulDrawer } from "../../index";

// calendar functions
import { changeCalendarWeek, setDateOrar } from "../orar/utils";
import { AuthContext } from "../../../context/AuthContext";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function SalaFitnessZorilor() {
  const { user, selectors } = useContext(AuthContext);
  const { filtre, setFiltre } = useState({
    antrenor: '',
    clasa: ''
  });
  const [dataOrar, setDataOrar] = useState([]);
  const [dateCalendar, setDateCalendar] = useState(setDateOrar());
  const [errors, setErrors] = useState({
    noAerobic: "",
  });

  async function getOrar() {
    let response = await axios.get(
      `${API_URL}/classes/orarClase?locatie=zorilor`,
    );
    // console.log(response.data);
    setDataOrar(response.data);
  }
  useEffect(() => {
    if (user !== undefined) {
      if (
        user.activeSubscriptions.some((subscription) =>
          subscription.subscriptionName.toLowerCase().includes("aerobic"),
        )
      ) {
        setErrors({ ...errors, noAerobic: false });
      } else {
        setErrors({ ...errors, noAerobic: true });
      }
    } else {
      setErrors({ ...errors, noAerobic: true });
    }

    getOrar();
  }, []);

  return (
    <div className="h-fit flex flex-col items-center font-finlandica pb-[50px]">
      <h1 className="text-[20px] md:text-[35px] font-[700] pb-[20px] pt-[30px] text-center">
        Sala fitness ZORILOR
      </h1>
      <div
        id="orar"
        className="h-fit flex flex-col items-center shadow-xl p-[25px] rounded-xl bg-white gap-5"
      >
        <div className="flex flex-row items-center gap-5">
        <VaulDrawer open={true} filtre={filtre} setFiltre={setFiltre}/>
          <div className="flex flex-col items-center">
            <span>
              {dateCalendar[0].toLocaleDateString()} -{" "}
              {dateCalendar[6].toLocaleDateString()}
            </span>
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() =>
                  changeCalendarWeek("substract", dateCalendar, setDateCalendar)
                }
                className="cursor-pointer"
              >
                <FontAwesomeIcon icon={faSquareCaretLeft} />
              </button>
              <h2 className="text-[16px] md:text-[20px] font-[700]">
                ORAR-CLASE
              </h2>
              <button
                onClick={() =>
                  changeCalendarWeek("add", dateCalendar, setDateCalendar)
                }
                className="cursor-pointer"
              >
                <FontAwesomeIcon icon={faSquareCaretRight} />
              </button>
            </div>
          </div>
          <span
            className={`${errors.noAerobic ? "block" : "hidden"} text-red-500`}
          >
            Ai nevoie de abonament AEROBIC pentru a te înscrie
          </span>
        </div>
        <div
          className="flex flex-row gap-2 text-[14px]
          md:text-[16px]"
        >
          {/* <div className="fixed flex items-center flex-col bottom-0 left-0 h-[50%] bg-white w-full rounded-t-2xl p-5">
            <h1 className="text-[22px] font-[700]">FILTRE</h1>
            <div className="flex flex-col gap-2">
              <span>Clasă:</span>
              <div name="" id="">
              <div value="">TOATE CLASELE <FontAwesomeIcon icon={faCheckCircleSolid}/></div>
              {selectors.clase.map((clasa) => {
                return <div value={clasa.numeClasa}>{clasa.numeClasa} <FontAwesomeIcon icon={faCheckCircleRegular}/></div>
                })}
                </div>
              <div className="flex gap-2">
                <span>Antrenor:</span>
                <div className="flex flex-col ">

                  <div value="">TOȚI ANTRENORII <FontAwesomeIcon icon={faCheckCircleSolid}/></div>
                  {selectors.antrenori.map((antrenor) => {
                    return (
                      <div value={antrenor.numeAntrenor}>
                        {antrenor.numeAntrenor}
                        <FontAwesomeIcon icon={faCheckCircleSolid}/>
                      </div>
                    );
                  })}
              </div>
                  </div>
            </div>
          </div> */}
        </div>
        <div className="h-fit flex flex-col md:grid md:grid-cols-4 gap-10 md:gap-5">
          <ZiOrar
            dataOrar={dataOrar}
            zi="Luni"
            data={dateCalendar[0].toLocaleDateString()}
            getOrar={getOrar}
          />
          <ZiOrar
            dataOrar={dataOrar}
            zi="Marți"
            data={dateCalendar[1].toLocaleDateString()}
            getOrar={getOrar}
          />
          <ZiOrar
            dataOrar={dataOrar}
            zi="Miercuri"
            data={dateCalendar[2].toLocaleDateString()}
            getOrar={getOrar}
          />
          <ZiOrar
            dataOrar={dataOrar}
            zi="Joi"
            data={dateCalendar[3].toLocaleDateString()}
            getOrar={getOrar}
          />
          <ZiOrar
            dataOrar={dataOrar}
            zi="Vineri"
            data={dateCalendar[4].toLocaleDateString()}
            getOrar={getOrar}
          />
          <ZiOrar
            dataOrar={dataOrar}
            zi="Sâmbătă"
            data={dateCalendar[5].toLocaleDateString()}
            getOrar={getOrar}
          />
          <ZiOrar
            dataOrar={dataOrar}
            zi="Duminică"
            data={dateCalendar[6].toLocaleDateString()}
            getOrar={getOrar}
          />
        </div>
      </div>
    </div>
  );
}

export default SalaFitnessZorilor;
