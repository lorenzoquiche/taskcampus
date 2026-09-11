import { ArrowLeft, FileQuestion } from "lucide-react";
import Button from "../components/Button.jsx";

export default function NotFoundPage() {
  return <main className="not-found"><FileQuestion aria-hidden="true" /><p className="eyebrow">Error 404</p><h1>Página no encontrada</h1><p>La dirección que buscas no existe o fue movida.</p><Button to="/"><ArrowLeft aria-hidden="true" /> Volver al inicio</Button></main>;
}
