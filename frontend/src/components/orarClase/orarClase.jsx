import { NavLink } from "react-router";

const buttonStyle = `bg-rose-500 text-white p-5 w-full md:w-100 rounded-md`

export default function OrarClase(){
    return <div className="w-full md:min-h-140 flex flex-col md:items-center md:justify-center text-white p-5">
        <div className="flex flex-col gap-2 items-center justify-center">
            <NavLink to='/salidefitness/sala-fitness-zorilor#orar' className={buttonStyle}>ORAR CLASE ZORILOR</NavLink>
            <NavLink to='/salidefitness/sala-fitness-sigma' className={buttonStyle}>ORAR CLASE SIGMA</NavLink>
            <NavLink to='/salidefitness/sala-fitness-manastur' className={buttonStyle}>ORAR CLASE MĂNĂȘTUR</NavLink>
            <NavLink to='/salidefitness/sala-fitness-flora' className={buttonStyle}>ORAR CLASE FLORA</NavLink>
            <NavLink to='/salidefitness/sala-fitness-marasti' className={buttonStyle}>ORAR CLASE MĂRĂȘTI</NavLink>
        </div>
    </div>
}