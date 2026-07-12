import { useEffect, useState, useRef } from "react";

function CardListaAbonamente({ dataAbonament }) {
    const [detalii, setDetalii] = useState(false);
    let zileRamase = Math.ceil((new Date(dataAbonament.expiryDate) - Date.now()) / (1000 * 60 * 60 * 24));

    const cardAbonament = useRef(null)

    useEffect(() => {
      const handleClickOutside = (e) => {
        if(cardAbonament.current && !cardAbonament.current.contains(e.target)) {
          setDetalii(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])


  return <div ref={cardAbonament}
              className="flex flex-col gap-2 h-fit w-full md:w-fit
              shadow-md p-5 rounded-md font-finlandica ring-2"
            >
              <div className="flex flex-col items-baseline justify-between">
                <div className="flex items-baseline justify-between gap-5">
                  <h1 className="font-[700] text-[18px]">
                    {dataAbonament.subscriptionName}
                  </h1>
                </div>
                <span className="text-[16px]">
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
                  className={`cursor-pointer bg-rose-500 rounded-md text-[14px] w-fit text-white p-2`}
                >
                  {detalii === false ? 'Vezi mai multe detalii' : 'Vezi mai puține detalii'}
                </button>
              <div className={`${detalii === true ? 'opacity-100 h-18' : 'opacity-0 h-0'} flex flex-col justify-between text-[15px]
              duration-150 ease-out`}>
                <span>Durație: {dataAbonament.duration} {dataAbonament.duration > 1 ? 'Luni' : 'Lună'}</span>
                <span>Plătit: {dataAbonament.price} lei</span>
                <span>Cumpărat în: {new Date(dataAbonament.purchaseDate).toLocaleDateString()}</span>
                <span>Expiră în: {new Date(dataAbonament.expiryDate).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2 text-[16px]">
                <button
                  className={`${zileRamase === 0 ? "block" : "hidden"} bg-rose-500 rounded-md text-white p-2`}
                >
                  Reînnoiește abonamentul
                </button>
              </div>
            </div>
}

export default CardListaAbonamente;
