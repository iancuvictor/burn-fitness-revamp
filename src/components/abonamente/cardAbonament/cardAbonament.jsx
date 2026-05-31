function CardAbonament(props) {
  let propArray = Object.values(props);
  let perioadaArray = propArray.filter(
    (prop) => prop.includes("Lună") || prop.includes("Luni"),
  );
  let preturiArray = propArray.filter((prop) => prop.includes("Lei"));
  return (
    <div className="w-full rounded-sm font-finlandica flex flex-col justify-between p-[10px] gap-10 items-center w-sm bg-black text-white">
      <h1 className="font-bold text-[25px]">{props.titlu}</h1>
      <div className="flex flex-wrap">
        {perioadaArray.map((item, index) => {
          return (
              <div key={index} className="flex 1 w-[50%]">
                <span>{item} / {preturiArray[index]}</span>
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default CardAbonament;
