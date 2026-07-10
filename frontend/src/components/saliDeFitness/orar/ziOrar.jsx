import CardClasaOrar from "./cardClasaOrar";

function ZiOrar({ dataOrar, zi, data, getOrar, filtre, calendarDate }) {

  let classesArray = [];
  for (let clasa of dataOrar) {
    if (new Date(clasa.data).toLocaleDateString() === data) {
      classesArray.push(clasa);
    }
  }

  const isExpired = (clasa) => {
    let classDate = new Date(clasa.data);
    classDate.setHours(...clasa.ora.split(':'));
    return classDate < new Date();
}


  let checkFilter = classesArray.filter((clasa) => 
    (filtre.clasa.length === 0 || filtre.clasa.includes(clasa.denumire)) &&
    (filtre.antrenor.length === 0 || filtre.antrenor.includes(clasa.antrenor))
)

    let finalFilter = !filtre.viewExpired 
    ? checkFilter.filter(clasa => !isExpired(clasa)) 
    : checkFilter;

if(finalFilter.length !== 0)
  return (
    <div className="font-finlandica">
      <h1 className="text-[24px] font-[700]">{zi} <span className="font-[500] text-[16px]">[{data}]</span></h1>
      <div className="flex flex-col gap-2">
        {finalFilter.length > 0 ? (finalFilter.length > 0 ?
          finalFilter.map((clasa, index) => {
            if (finalFilter.length > 0) {
              return <CardClasaOrar key={index} clasa={clasa} getOrar={getOrar} data={data} calendarDate={calendarDate} filtre={filtre}/>
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
