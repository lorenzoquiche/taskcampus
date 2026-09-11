import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./useAuth.js";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p role="status">Validando sesión...</p>;

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}
