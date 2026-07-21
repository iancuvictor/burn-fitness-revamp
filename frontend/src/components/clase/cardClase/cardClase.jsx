import { NavLink } from "react-router";

const API_URL = import.meta.env.VITE_BACKEND_URL

export default function CardClase({ data }) {
  return (
    <NavLink to={`/clasa/${data._id}`}
      className="cursor-pointer group bg-black relative flex flex-col justify-baseline items-center 
      w-fit aspect-square md:w-80 font-finlandica rounded-xl overflow-hidden animate-fade-in"
    >
      <div className=" z-1 absolute top-0 w-full h-full md:opacity-15 md:bg-black hover:opacity-0 duration-400"></div>
      <div className="relative flex flex-col justify-baseline items-center overflow-hidden h-full w-full">
        <img
          src={`${data.imagine}?t=${Date.now()}`}
          alt=""
          className="w-full h-full md:group-hover:scale-120 duration-150 ease-out object-cover object-center select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-20% to-transparent"></div>
      </div>
      <h1 className="text-[20px] font-[600] h-20 text-white">
        {data.nume}
      </h1>
    </NavLink>
  );
}
