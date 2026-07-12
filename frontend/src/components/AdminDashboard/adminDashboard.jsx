import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="pl-60 bg-white w-full min-h-screen font-finlandica pt-[50px]">
      <h1 className="font-[700]">Conectat cu contul: {user.username}</h1>
    </div>
  );
}

export default AdminDashboard;
