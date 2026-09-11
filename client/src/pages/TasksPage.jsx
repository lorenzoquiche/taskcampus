import { Check, Edit3, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { taskService } from "../api/tasks.js";
import Alert from "../components/Alert.jsx";
import Button from "../components/Button.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import PageHeader from "../components/PageHeader.jsx";

const statusLabels = { pending: "Pendiente", in_progress: "En progreso", completed: "Completada" };
const priorityLabels = { low: "Baja", medium: "Media", high: "Alta" };

export default function TasksPage() {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "", priority: "" });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(location.state?.message || "");
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    let active = true;
    taskService.list(filters).then((result) => { if (active) setTasks(result); }).catch((requestError) => { if (active) setError(requestError.response?.data?.message || "No fue posible cargar las tareas"); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [filters]);

  const changeFilter = ({ target }) => { setLoading(true); setError(""); setFilters((current) => ({ ...current, [target.name]: target.value })); };
  const submitSearch = (event) => { event.preventDefault(); setLoading(true); setError(""); setFilters((current) => ({ ...current, search: search.trim() })); };
  const completeTask = async (task) => {
    setError(""); setSuccess(""); setProcessing(`complete-${task.id}`);
    try { const { task: updated } = await taskService.update(task.id, { ...task, status: "completed" }); setTasks((current) => current.map((item) => item.id === task.id ? updated : item)); setSuccess("Tarea marcada como completada"); }
    catch (requestError) { setError(requestError.response?.data?.message || "No fue posible actualizar la tarea"); }
    finally { setProcessing(null); }
  };
  const deleteTask = async (task) => {
    if (!window.confirm(`¿Eliminar la tarea “${task.title}”?`)) return;
    setError(""); setSuccess(""); setProcessing(`delete-${task.id}`);
    try { const result = await taskService.remove(task.id); setTasks((current) => current.filter((item) => item.id !== task.id)); setSuccess(result.message); }
    catch (requestError) { setError(requestError.response?.data?.message || "No fue posible eliminar la tarea"); }
    finally { setProcessing(null); }
  };

  return <><PageHeader eyebrow="Organización" title="Mis tareas" description="Busca, filtra y actualiza tus compromisos académicos." actions={<Button to="/tasks/new"><Plus aria-hidden="true" /> Nueva tarea</Button>} />{error && <Alert>{error}</Alert>}{success && <Alert type="success">{success}</Alert>}<section className="task-filters" aria-label="Filtros de tareas"><form className="search-box" onSubmit={submitSearch}><label className="sr-only" htmlFor="task-search">Buscar tareas</label><Search aria-hidden="true" /><input id="task-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por título, curso o descripción" /><button type="submit">Buscar</button></form><label><span>Estado</span><select name="status" value={filters.status} onChange={changeFilter}><option value="">Todos</option><option value="pending">Pendientes</option><option value="in_progress">En progreso</option><option value="completed">Completadas</option></select></label><label><span>Prioridad</span><select name="priority" value={filters.priority} onChange={changeFilter}><option value="">Todas</option><option value="low">Baja</option><option value="medium">Media</option><option value="high">Alta</option></select></label></section>{loading ? <LoadingSpinner label="Cargando tareas..." /> : tasks.length === 0 ? <EmptyState title="No hay tareas para mostrar" description="Crea tu primera tarea o ajusta los filtros de búsqueda." actionLabel="Crear una tarea" actionTo="/tasks/new" /> : <section className="task-grid" aria-label="Listado de tareas">{tasks.map((task) => <article className="task-card" key={task.id}><div className="task-card__meta"><span className={`badge badge--${task.priority}`}>{priorityLabels[task.priority]}</span><span className={`badge badge--${task.status}`}>{statusLabels[task.status]}</span></div><h2>{task.title}</h2><p className="task-card__course">{task.course}</p>{task.description && <p>{task.description}</p>}<p className="task-card__date">Entrega: <time dateTime={task.due_date}>{task.due_date}</time></p><div className="task-card__actions"><Link className="button button--secondary" to={`/tasks/${task.id}/edit`}><Edit3 aria-hidden="true" /> Editar</Link>{task.status !== "completed" && <button className="button button--success" type="button" disabled={Boolean(processing)} onClick={() => completeTask(task)}><Check aria-hidden="true" /> {processing === `complete-${task.id}` ? "Guardando..." : "Completar"}</button>}<button className="button button--danger" type="button" disabled={Boolean(processing)} onClick={() => deleteTask(task)}><Trash2 aria-hidden="true" /> {processing === `delete-${task.id}` ? "Eliminando..." : "Eliminar"}</button></div></article>)}</section>}</>;
}
