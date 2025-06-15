import { useAuthStore } from "../../../stores/auth/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

export default function ProtectedRoutes() {
  const { user } = useAuthStore((state) => state);
  if (!user) return <Navigate to="/login" replace />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
