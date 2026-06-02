function CardAbonament(props) {
  let propArray = Object.values(props);
  let perioadaArray = propArray.filter(
    (prop) => prop.includes("Lună") || prop.includes("Luni"),
  );
  let preturiArray = propArray.filter((prop) => prop.includes("Lei"));

  if (props.tier === undefined) {
    return (
      <div className="group transition-all duration-150 h-[450px] md:h-[480px] w-xs rounded-xl overflow-hidden cursor-pointer relative font-finlandica flex flex-col justify-between pb-[30px] gap-10 items-center bg-black text-white">
        <div className=" z-1 absolute top-0 w-full h-full md:opacity-30 md:bg-black hover:opacity-0 duration-150"></div>
        <div className="w-full relative h-60 md:h-80 md:group-hover:h-60 duration-400 ease-out">
          <img
            src={props.imagine}
            alt=""
            className="w-full h-60 md:h-80 md:group-hover:h-60 duration-400 ease-out object-cover object-top select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-40% to-transparent"></div>
        </div>
        <div className='flex flex-col justify-evenly items-center h-40 md:h-20 md:group-hover:h-40 duration-400 ease-out'>
        <h1 className="font-bold text-[25px]">{props.titlu}</h1>
        <div className="w-full flex flex-wrap pl-[20px] pr-[20px] border-box md:m-h-0 md:overflow-hidden md:group-hover:m-h-96 md:opacity-0 md:group-hover:opacity-100 transition-all duration-400 ease-out">
          {perioadaArray.map((item, index) => {
            return (
              <div key={index} className="flex 1 w-[50%]">
                <span>
                  {preturiArray[index]} / {item}
                </span>
              </div>
            );
          })}
        </div>
          </div>
      </div>
    );
  } else if (props.tier === "premium") {
    return (
      <div className="group h-[480px] w-xs rounded-xl overflow-hidden cursor-pointer relative font-finlandica flex flex-col justify-between pb-[30px] gap-10 items-center bg-black text-white">
        <div className={`z-1 absolute top-0 w-full h-full md:bg-black md:opacity-30 hover:opacity-0 duration-150`}></div>
        <div className="w-full relative h-60 md:h-80">
          <img
            src={props.imagine}
            alt=""
            className="w-full h-60 md:h-80 group-hover:h-60 transition-all duration-400 ease-out object-cover object-top select-none"
          />
          <div className={`${props.type === "GOLD" ? "md:bg-[#FFDD80] opacity-20" : "md:bg-[#747A80] opacity-20"} z-0 absolute top-0 w-full h-full`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-40% to-transparent"></div>
        </div>

        <div className='flex flex-col justify-between items-center h-40 gap-3'>
          <div className='flex flex-col items-center gap-0'>
          <h1 className={`${props.type === "GOLD" ? "text-[#F7B52F]" : "text-[#C3CAD9]"} font-[800] text-[30px]`}>{props.type}</h1>
          <h1 className="font-bold text-[25px]">{props.titlu}</h1>
          <div className="w-full flex flex-wrap pl-[20px] pr-[20px] border-box md:opacity-0 md:group-hover:opacity-100 transition-all duration-400 ease-out">
            {perioadaArray.map((item, index) => {
              return (
                <div key={index} className="flex items-center justify-center w-[100%]">
                  <span className='underline underline-offset-4'>
                    {preturiArray[index]} / {item}
                  </span>
                </div>
              );
            })}
          </div>
          </div>
          <p className='text-center text-[#B3B3C7] text-[16px] md:opacity-0 md:group-hover:opacity-100 transition-all duration-400 ease-out'>{props.desc}</p>
        </div>
      </div>
    );
  }
}

export default CardAbonament;
