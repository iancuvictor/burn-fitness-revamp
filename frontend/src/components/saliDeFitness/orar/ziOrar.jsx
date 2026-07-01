import CardClasaOrar from "./cardClasaOrar";

function ZiOrar({ dataOrar, zi, data, getOrar, filtre, calendarDate }) {

  let classesArray = [];
  for (let clasa of dataOrar) {
    if (new Date(clasa.data).toLocaleDateString() === data) {
      classesArray.push(clasa);
    }
  }

  let checkFilter = classesArray.filter((clasa) => 
    (filtre.clasa.length === 0 || filtre.clasa.includes(clasa.denumire)) &&
    (filtre.antrenor.length === 0 || filtre.antrenor.includes(clasa.antrenor))
)

  return (
    <div className="font-finlandica">
      <h1 className="text-[28px] font-[700]">{zi} <span className="font-[500] text-[16px]">[{data}]</span></h1>
      <div className="flex flex-col gap-2">
        {classesArray.length > 0 ? (checkFilter.length > 0 ?
          checkFilter.map((clasa, index) => {
              if (classesArray.length > 0) {
                return <CardClasaOrar key={index} clasa={clasa} getOrar={getOrar} data={data} calendarDate={calendarDate}/>
              }
            })
        : (
          <div className="flex">
            <h1>Nici un rezultat nu se potrivește cu filtrele aplicate</h1>
          </div>
        )) : (
          <div className="flex">
            <h1>Nu există nici o clasă programată {zi.toLowerCase()}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ZiOrar;
