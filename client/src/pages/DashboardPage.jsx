import { CheckCircle2, CircleDashed, Clock3, ListTodo, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { taskService } from "../api/tasks.js";
import useAuth from "../auth/useAuth.js";
import Alert from "../components/Alert.jsx";
import Button from "../components/Button.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";

export default function DashboardPage() {
  const { user } = useAuth(); const [tasks, setTasks] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { let active = true; taskService.list().then((result) => { if (active) setTasks(result); }).catch((requestError) => { if (active) setError(requestError.response?.data?.message || "No fue posible cargar el resumen"); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  const stats = [{ label: "Total", value: tasks.length, icon: ListTodo, tone: "primary" }, { label: "Pendientes", value: tasks.filter((task) => task.status === "pending").length, icon: CircleDashed, tone: "warning" }, { label: "En progreso", value: tasks.filter((task) => task.status === "in_progress").length, icon: Clock3, tone: "secondary" }, { label: "Completadas", value: tasks.filter((task) => task.status === "completed").length, icon: CheckCircle2, tone: "success" }];
  const upcoming = tasks.filter((task) => task.status !== "completed").slice(0, 5); const firstName = user.name.trim().split(/\s+/)[0];
  return <><PageHeader eyebrow={`Hola, ${firstName}`} title="Tu panorama académico" description="Consulta el estado general de tus tareas y prepara tus próximas entregas." actions={<Button to="/tasks/new"><Plus aria-hidden="true" /> Nueva tarea</Button>} />{error && <Alert>{error}</Alert>}{loading ? <LoadingSpinner label="Cargando resumen..." /> : <><section className="stats-grid" aria-label="Resumen de tareas">{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</section><section className="dashboard-section"><div className="section-heading"><p className="eyebrow">Agenda</p><h2>Próximas entregas</h2></div>{upcoming.length === 0 ? <EmptyState title="No hay entregas pendientes" description="Crea una tarea para comenzar a organizar tu agenda." actionLabel="Crear una tarea" actionTo="/tasks/new" /> : <div className="upcoming-list">{upcoming.map((task) => <article key={task.id}><div><h3>{task.title}</h3><p>{task.course}</p></div><time dateTime={task.due_date}>{task.due_date}</time></article>)}</div>}</section></>}</>;
}
