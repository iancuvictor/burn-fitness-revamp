function ZiOrar({ dataOrar, zi, data }) {
  // let ziFiltru = zi
  //   .normalize("NFD")
  //   .replace(/[\u0300-\u036f]/g, "")
  //   .toLowerCase();

    
    let classesArray = [];
    for (let clasa of dataOrar) {
    if (new Date(clasa.data).toLocaleDateString() === data) {
      classesArray.push(clasa);
    }
  }
  return (
    <div className="font-finlandica">
      <h1 className="font-[700]">{zi} {data}</h1>
      <div className="flex flex-col gap-2">
        {classesArray.length > 0 ? (
          classesArray.map((clasa, index) => {
            if (classesArray.length > 0) {
              return (
                <div className="flex flex-col gap-1 text-[12px]" key={index}>
                  <div className="flex gap-2">
                    <span>{clasa.ora}</span>
                    <span>{clasa.denumire}</span>
                    <span>{clasa.antrenor}</span>
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <span>
                        {clasa.inscrisi} / {clasa.capacitate}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div
                        className="h-full bg-[#6E7DFF] rounded"
                        style={{
                          width: `${(clasa.inscrisi / clasa.capacitate) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="flex">
            <h1>Nu există nici o clasă programată {zi.toLowerCase()}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ZiOrar;
