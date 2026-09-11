import { CheckCircle2, CircleDashed, Clock3, ListTodo, Plus } from "lucide-react";
import useAuth from "../auth/useAuth.js";
import Button from "../components/Button.jsx";
import EmptyState from "../components/EmptyState.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";

const stats = [{ label: "Total", value: 0, icon: ListTodo, tone: "primary" }, { label: "Pendientes", value: 0, icon: CircleDashed, tone: "warning" }, { label: "En progreso", value: 0, icon: Clock3, tone: "secondary" }, { label: "Completadas", value: 0, icon: CheckCircle2, tone: "success" }];

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user.name.trim().split(/\s+/)[0];
  return <><PageHeader eyebrow={`Hola, ${firstName}`} title="Tu panorama académico" description="Consulta el estado general de tus tareas y prepara tus próximas entregas." actions={<Button to="/tasks/new"><Plus aria-hidden="true" /> Nueva tarea</Button>} /><section className="stats-grid" aria-label="Resumen de tareas">{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</section><section className="dashboard-section"><div className="section-heading"><div><p className="eyebrow">Agenda</p><h2>Próximas entregas</h2></div></div><EmptyState title="Aún no hay entregas para mostrar" description="Cuando Johan conecte el servicio de tareas, tus próximas fechas aparecerán aquí automáticamente." actionLabel="Preparar una nueva tarea" actionTo="/tasks/new" /></section></>;
}
