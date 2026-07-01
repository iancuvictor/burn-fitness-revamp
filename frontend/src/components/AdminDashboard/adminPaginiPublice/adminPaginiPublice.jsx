import { NavLink } from "react-router"

const linkStyle = `shadow-md rounded-md p-3`;

export default function AdminPaginiPublice(){
    return <div className="min-h-screen bg-white w-full">
        <NavLink to='/salidefitness/sala-fitness-zorilor' className={linkStyle}>Sală zorilor</NavLink>
    </div>
}