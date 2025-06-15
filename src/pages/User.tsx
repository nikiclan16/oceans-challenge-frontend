import { Navigate } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import { useAuthStore } from "../stores/auth/useAuthStore";

export default function Users() {
  const { user } = useAuthStore();

  if (user && user.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  return <UserForm />;
}
