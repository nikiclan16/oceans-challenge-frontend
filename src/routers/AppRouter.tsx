import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NewOrder from "../pages/NewOrder";
import Products from "../pages/Products";
import Users from "../pages/User";
import ProtectedRoutes from "../components/ui/common/ProtectedRoutes";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/new-order" element={<NewOrder />} />
        <Route path="/users" element={<Users />} />
      </Route>
      <Route path="*" />
    </Routes>
  );
}
