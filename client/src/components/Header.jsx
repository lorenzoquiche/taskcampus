import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Header({ userName, onOpenMenu }) {
  return <header className="app-header"><button className="icon-button mobile-only" type="button" onClick={onOpenMenu} aria-label="Abrir menú"><Menu /></button><div className="app-header__identity"><span className="app-header__label">Sesión activa</span><strong>{userName}</strong></div><ThemeToggle /></header>;
}
