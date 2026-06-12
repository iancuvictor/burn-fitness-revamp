import AdminNavbar from "./adminNavbar";
import { Outlet } from "react-router";

function AdminLayout(){
    return <div className="w-full flex flex-row">
        <div className="sticky w-[20%]">
        <AdminNavbar />
        </div>
        <div className="relative w-[80%]">
        <Outlet />
        </div>
    </div>
}

export default AdminLayout;