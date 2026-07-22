import CardClasaOrar from "./cardClasaOrar";

function ZiOrar({ dataOrar, zi, data, getOrar, filtre, calendarDate }) {

  const now = new Date();

  let classesArray = dataOrar.filter(
    (clasa) => new Date(clasa.data).toLocaleDateString() === data
  );

  const isExpired = (clasa) => new Date(clasa.data) < now;

  let checkFilter = classesArray.filter((clasa) =>
    (filtre.clasa.length === 0 || filtre.clasa.includes(clasa.denumire)) &&
    (filtre.antrenor.length === 0 || filtre.antrenor.includes(clasa.antrenor))
  );

  let finalFilter = filtre.viewExpired
    ? checkFilter
    : checkFilter.filter((clasa) => !isExpired(clasa));

  if (finalFilter.length !== 0) {

    return (
      <div className="font-finlandica w-full">
        <h1 className="text-[24px] font-[700]">{zi} <span className="font-[500] text-[16px]">[{data}]</span></h1>
        <div className="flex flex-col gap-2">
          {finalFilter.length > 0 ? (finalFilter.length > 0 ?
            finalFilter.sort((a, b) => new Date(a.data) - new Date(b.data)).map((clasa, index) => {
              if (finalFilter.length > 0) {
                return <CardClasaOrar key={clasa._id} clasa={clasa} getOrar={getOrar} data={data} calendarDate={calendarDate} filtre={filtre} />
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
}

export default ZiOrar;
