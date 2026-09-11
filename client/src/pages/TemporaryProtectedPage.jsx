import { Construction } from "lucide-react";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

export default function TemporaryProtectedPage() {
  const { pathname } = useLocation();
  return <><PageHeader eyebrow="Módulo en preparación" title="Gestión de tareas" description="Esta vista queda preparada dentro del layout para la integración del CRUD." /><div className="temporary-state"><Construction aria-hidden="true" /><h2>Próximamente</h2><p>Ruta activa: <code>{pathname}</code></p></div></>;
}
