import { useState } from "react";
import { NavLink } from "react-router";

function ListaAbonamenteProfil({ data }) {
    const [detalii, setDetalii] = useState(false);


  return (
    <div>
      {data.length > 0 ? (
        data.map((abonament, index) => {
          let zileRamase = Math.ceil((new Date(abonament.expiryDate) - Date.now()) / (1000 * 60 * 60 * 24));
          return (
            <div
              key={index}
              className="flex flex-col gap-2 w-full
              shadow-md p-5 rounded-md font-finlandica"
            >
              <div className="flex flex-col items-baseline justify-between">
                <div className="flex items-baseline justify-between gap-5">
                  <h1 className="font-[700] text-[18px]">
                    {abonament.subscriptionName}
                  </h1>
                  {/* <span>Preț: {abonament.price} lei</span> */}
                </div>
                <span className="text-[14px]">
                  {zileRamase === 0 ? (
                    <span className="text-red-500 font-[600]">EXPIRAT</span>
                  ) : (
                    <span>
                      <span className="font-[700]">Zile rămase:</span>{" "}
                      {zileRamase}{" "}
                      {zileRamase > 19
                        ? "de zile"
                        : zileRamase > 1
                          ? "zile"
                          : "zi"}
                    </span>
                  )}
                </span>
              </div>
              <button
              onClick={() => setDetalii(!detalii)}
                  className={`bg-rose-500 rounded-md text-[14px] w-fit text-white p-2`}
                >
                  {detalii === false ? 'Vezi mai multe detalii' : 'Vezi mai puține detalii'}
                </button>
              <div className={`${detalii === true ? 'opacity-100 h-15' : 'opacity-0 h-0'} flex flex-col justify-between text-[14px]
              duration-150 ease-out`}>
                <span>Durație: {abonament.duration} {abonament.duration > 1 ? 'Luni' : 'Lună'}</span>
                <span>Cumpărat la data de: {new Date(abonament.purchaseDate).toLocaleDateString()}</span>
                <span>Expiră la data de: {new Date(abonament.expiryDate).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2 text-[14px]">
                <button
                  className={`${zileRamase === 0 ? "block" : "hidden"} bg-rose-500 rounded-md text-white p-2`}
                >
                  Reînnoiește abonamentul
                </button>
                {/* <button className="bg-rose-500 rounded-md text-white p-2">Elimină abonamentul</button> */}
              </div>
            </div>
          );
        })
      ) : (
        <h1>
          Nu ai nici un abonament activ.{" "}
          <NavLink
            to="/abonamente"
            className="text-[#3454E3] md:hover:text-[#3454E3]"
          >
            Cumpără unul aici
          </NavLink>
        </h1>
      )}
    </div>
  );
}

export default ListaAbonamenteProfil;
