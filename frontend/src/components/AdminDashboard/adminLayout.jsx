import AdminNavbar from "./adminNavbar";
import { Outlet } from "react-router";

function AdminLayout(){
    return <div className="min-h-screen w-full flex flex-row">
        <div className="relative w-[15%]">
        <AdminNavbar />
        </div>
        <div className="relative w-[85%]">
        <Outlet />
        </div>
    </div>
}

export default AdminLayout;