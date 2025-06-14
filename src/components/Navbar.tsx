import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();

  const { isAuthenticated, role } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex space-x-4">
      <Link to="/products">Productos</Link>
      <Link to="/new-order">Nueva Orden</Link>
      <Link to="/dashboard">Órdenes</Link>
      {role === "admin" && <Link to="/users">Usuarios</Link>}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="ml-auto text-sm text-red-300 hover:text-red-100"
        >
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}
