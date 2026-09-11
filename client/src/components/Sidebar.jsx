import { ClipboardList, GraduationCap, LayoutDashboard, LogOut, PlusCircle, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tareas", icon: ClipboardList },
  { to: "/tasks/new", label: "Nueva tarea", icon: PlusCircle },
];

export default function Sidebar({ open, onClose, onLogout }) {
  return <><button className={`sidebar-backdrop ${open ? "is-open" : ""}`} type="button" aria-label="Cerrar menú" onClick={onClose} /><aside className={`sidebar ${open ? "is-open" : ""}`} aria-label="Navegación principal"><div className="sidebar__brand"><span className="brand-mark"><GraduationCap /></span><span><strong>TaskCampus</strong><small>Organiza tu semestre</small></span><button className="icon-button mobile-only" type="button" onClick={onClose} aria-label="Cerrar menú"><X /></button></div><nav>{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}><Icon aria-hidden="true" />{label}</NavLink>)}</nav><button className="nav-link sidebar__logout" type="button" onClick={onLogout}><LogOut aria-hidden="true" />Cerrar sesión</button></aside></>;
}
