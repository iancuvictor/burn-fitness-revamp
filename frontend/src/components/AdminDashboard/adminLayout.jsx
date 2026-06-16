import AdminNavbar from "./adminNavbar";
import { Outlet } from "react-router";

function AdminLayout(){
    return <div className="min-h-screen w-full flex flex-row">
        <AdminNavbar />
        <Outlet />
    </div>
}

export default AdminLayout;