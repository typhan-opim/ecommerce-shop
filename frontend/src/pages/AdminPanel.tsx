import { useEffect } from "react";
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ROLE from "@/common/role";


// User type is inferred from API

const AdminPanel = () => {
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="md:min-h-[calc(100vh-120px)] md:flex">
      <aside className="bg-white min-h-full w-full md:max-w-60 customShadow p-2">
        <div className="h-32 flex justify-center items-center flex-col mt-4">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser className='w-20 h-20 text-slate-400'/>
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className="grid md:grid-cols-1 grid-cols-3 p-4 gap-2">
            <NavLink
              to={"all-users"}
              className={({ isActive }) =>
                `px-2 py-1 rounded transition font-medium ${isActive ? "bg-orange-100 text-orange-600 shadow" : "hover:bg-slate-100"}`
              }
            >
              All Users
            </NavLink>
            <NavLink
              to={"all-products"}
              className={({ isActive }) =>
                `px-2 py-1 rounded transition font-medium ${isActive ? "bg-orange-100 text-orange-600 shadow" : "hover:bg-slate-100"}`
              }
            >
              All product
            </NavLink>
            <NavLink
              to={"all-orders"}
              className={({ isActive }) =>
                `px-2 py-1 rounded transition font-medium ${isActive ? "bg-orange-100 text-orange-600 shadow" : "hover:bg-slate-100"}`
              }
            >
              All Orders
            </NavLink>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
