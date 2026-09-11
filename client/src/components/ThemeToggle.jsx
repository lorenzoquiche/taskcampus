import { Moon, Sun } from "lucide-react";
import useTheme from "../theme/useTheme.js";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "oscuro" : "claro";
  return <button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Cambiar a tema ${nextTheme}`} title={`Cambiar a tema ${nextTheme}`}>{theme === "light" ? <Moon /> : <Sun />}</button>;
}
