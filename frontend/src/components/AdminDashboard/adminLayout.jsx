import AdminNavbar from "./adminNavbar";
import { Outlet } from "react-router";

function AdminLayout(){
    return <div className="w-full flex flex-col">
        {/* <AdminNavbar /> */}
        <div>
        <Outlet />
        </div>
    </div>
}

export default AdminLayout;