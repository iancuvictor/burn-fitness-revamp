import Zi from "./zi";

function Orar({ locatie, dataOrar, getOrar }) {
  return (
    <div className="flex w-full font-finlandica bg-white">
      <div className="relative w-full grid grid-cols-3 p-[20px] gap-4 w-full">
        <Zi zi="Luni" locatie={locatie} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Marți" locatie={locatie} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Miercuri" locatie={locatie} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Joi" locatie={locatie} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Vineri" locatie={locatie} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Sâmbătă" locatie={locatie} dataOrar={dataOrar} getOrar={getOrar}/>
        <Zi zi="Duminică" locatie={locatie} dataOrar={dataOrar} getOrar={getOrar}/>
      </div>
    </div>
  );
}

export default Orar;
