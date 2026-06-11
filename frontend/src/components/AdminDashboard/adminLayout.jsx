import AdminNavbar from "./adminNavbar";
import { Outlet } from "react-router";

function AdminLayout(){
    return <div className="flex flex-row">
        <AdminNavbar />
        <Outlet />
    </div>
}

export default AdminLayout;