function CardClase(props) {
  return (
    <div
      id="test"
      className="cursor-pointer group bg-black relative flex flex-col justify-baseline items-center w-xs h-90 font-finlandica rounded-xl overflow-hidden"
    >
        <div className=" z-1 absolute top-0 w-full h-full md:opacity-30 md:bg-black hover:opacity-0 duration-400"></div>
      <div className="relative flex flex-col justify-baseline items-center w-xs h-90 overflow-hidden">
        <img
          src={props.img}
          alt=""
          className="w-full md:h-100 md:group-hover:scale-120 duration-400 ease-out object-cover object-top select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-40% to-transparent"></div>
      </div>
      <h1 className="text-[25px] font-[600] h-20 text-white">
        {props.title}
      </h1>
    </div>
  );
}

export default CardClase;
