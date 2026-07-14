import { NavLink } from "react-router";

const API_URL = import.meta.env.VITE_BACKEND_URL

export default function CardClase({data}) {
  return (
    <NavLink to={`/clasa/${data._id}`}
      className="cursor-pointer group bg-black relative flex flex-col justify-baseline items-center 
      w-fit h-[50%] md:w-xs md:h-90 font-finlandica rounded-xl overflow-hidden"
    >
        <div className=" z-1 absolute top-0 w-full h-full md:opacity-30 md:bg-black hover:opacity-0 duration-400"></div>
      <div className="relative flex flex-col justify-baseline items-center w-full md:w-xs h-90 overflow-hidden">
        <img
          src={`${API_URL}/uploads/POZECLASE/${data.imagine}?t=${Date.now()}`}
          alt=""
          className="w-full md:h-100 md:group-hover:scale-120 duration-400 ease-out object-cover object-top select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-40% to-transparent"></div>
      </div>
      <h1 className="text-[25px] font-[600] h-20 text-white">
        {data.nume}
      </h1>
    </NavLink>
  );
}
