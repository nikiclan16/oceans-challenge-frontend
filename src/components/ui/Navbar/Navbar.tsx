import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../../stores/auth/useAuthStore";

export default function Navbar() {
  const { user, clearSession } = useAuthStore();

  const handleLogout = () => {
    clearSession();
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center">
      <div className="flex space-x-4">
        {user?.role === "admin" && (
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-[#535bf2]" : "text-white"
            }
          >
            Productos
          </NavLink>
        )}
        <NavLink
          to="/new-order"
          className={({ isActive }) =>
            isActive ? "text-[#535bf2]" : "text-white"
          }
        >
          Nueva Orden
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-[#535bf2]" : "text-white"
          }
        >
          Órdenes
        </NavLink>
        {user?.role === "admin" && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "text-[#535bf2]" : "text-white"
            }
          >
            Usuarios
          </NavLink>
        )}
      </div>

      <div className="ml-auto flex gap-6">
        <div>
          <p className="capitalize">{user?.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-300 hover:text-red-100"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
