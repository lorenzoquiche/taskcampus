import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth.js";

export default function TemporaryProtectedPage() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="simple-page">
      <h1>Área protegida temporal</h1>
      <p>Ruta actual: {location.pathname}</p>
      <p>Sesión activa para {user.name}.</p>
      <nav><Link to="/dashboard">Dashboard</Link>{" · "}<Link to="/tasks">Tareas</Link>{" · "}<Link to="/tasks/new">Nueva tarea</Link></nav>
      <button type="button" onClick={handleLogout}>Cerrar sesión</button>
    </main>
  );
}
