import AdminNavbar from "./adminNavbar";
import { Outlet } from "react-router";

function AdminLayout(){
    return <div className="min-h-screen w-full flex flex-col">
        <AdminNavbar />
        <div className="">
        <Outlet />
        </div>
    </div>
}

export default AdminLayout;