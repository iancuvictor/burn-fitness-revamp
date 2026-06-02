function CardAbonament(props) {
  let propArray = Object.values(props);
  let perioadaArray = propArray.filter(
    (prop) => prop.includes("Lună") || prop.includes("Luni"),
  );
  let preturiArray = propArray.filter((prop) => prop.includes("Lei"));
  return (
    <div className="h-[450px] w-xs rounded-xl overflow-hidden cursor-pointer relative font-finlandica flex flex-col justify-between pb-[30px] gap-10 items-center bg-black text-white">
    <div className=" z-1 absolute top-0 w-full h-full md:opacity-40 md:bg-black hover:opacity-0 duration-150"></div>
      <div className="w-full relative h-60">
        <img
          src={props.imagine}
          alt=""
          className='w-full h-60 object-cover object-top select-none'
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-70% to-transparent"></div>
      </div>
      <h1 className="font-bold text-[25px]">{props.titlu}</h1>
      <div className="w-full flex flex-wrap pl-[20px] pr-[20px] border-box">
        {perioadaArray.map((item, index) => {
          return (
            <div key={index} className="flex 1 w-[50%]">
              <span>
                {item} / {preturiArray[index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CardAbonament;
