import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: Props) {
  const { role } = useAuth();
  return role === "admin" ? children : <Navigate to="/dashboard" replace />;
}
