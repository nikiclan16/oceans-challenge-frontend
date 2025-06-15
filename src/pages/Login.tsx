import { Navigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { useAuthStore } from "../stores/auth/useAuthStore";

export default function Login() {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <LoginForm />;
}
