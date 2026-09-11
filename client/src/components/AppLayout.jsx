import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth.js";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/login", { replace: true }); };
  return <div className="app-shell"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} /><div className="app-shell__content"><Header userName={user.name} onOpenMenu={() => setMenuOpen(true)} /><main className="main-content"><Outlet /></main></div></div>;
}
