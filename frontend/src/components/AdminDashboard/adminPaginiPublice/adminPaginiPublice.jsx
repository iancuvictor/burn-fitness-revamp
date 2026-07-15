import { NavLink } from "react-router"

const linkStyle = `shadow-md rounded-md p-3`;

export default function AdminPaginiPublice(){
    return <div className="min-h-[calc(100vh-5rem)] bg-white w-full pt-5 flex flex-col items-center">
        <NavLink to='/salidefitness/sala-fitness-zorilor' className={linkStyle}>Sală zorilor</NavLink>
    </div>
}