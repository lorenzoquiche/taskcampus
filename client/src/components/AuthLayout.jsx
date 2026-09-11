import { GraduationCap } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

export default function AuthLayout({ eyebrow, title, description, children, footer }) {
  return <main className="auth-layout"><section className="auth-panel"><header className="auth-brand"><span className="brand-mark"><GraduationCap /></span><strong>TaskCampus</strong><ThemeToggle /></header><div className="auth-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>{children}<footer className="auth-footer">{footer}</footer></section><aside className="auth-aside" aria-label="Presentación de TaskCampus"><div><span className="auth-aside__mark"><GraduationCap /></span><h2>Tu semestre, bajo control.</h2><p>Organiza prioridades y mantén tus entregas académicas visibles en un solo lugar.</p></div></aside></main>;
}
