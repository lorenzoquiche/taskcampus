import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { taskService } from "../api/tasks.js";
import Alert from "../components/Alert.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import PageHeader from "../components/PageHeader.jsx";
import TaskForm from "../components/TaskForm.jsx";

export default function TaskFormPage() {
  const { id } = useParams(); const navigate = useNavigate(); const editing = Boolean(id);
  const [task, setTask] = useState(null); const [loading, setLoading] = useState(editing); const [saving, setSaving] = useState(false); const [error, setError] = useState(""); const [success, setSuccess] = useState("");
  useEffect(() => { if (!editing) return; let active = true; taskService.get(id).then((result) => { if (active) setTask(result); }).catch((requestError) => { if (active) setError(requestError.response?.data?.message || "No fue posible cargar la tarea"); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [editing, id]);
  const save = async (values) => { setSaving(true); setError(""); setSuccess(""); try { const result = editing ? await taskService.update(id, values) : await taskService.create(values); setSuccess(result.message); window.setTimeout(() => navigate("/tasks", { replace: true, state: { message: result.message } }), 600); } catch (requestError) { const response = requestError.response?.data; setError(response?.errors?.[0]?.message || response?.message || "No fue posible guardar la tarea"); } finally { setSaving(false); } };
  if (loading) return <LoadingSpinner label="Cargando tarea..." />;
  return <><PageHeader eyebrow={editing ? "Editar" : "Crear"} title={editing ? "Editar tarea" : "Nueva tarea"} description={editing ? "Actualiza los datos y guarda los cambios." : "Registra una entrega académica con la información necesaria."} />{editing && !task ? <div className="form-card"><Alert>{error || "Tarea no encontrada"}</Alert></div> : <div className="form-card"><TaskForm initialValues={task || undefined} onSubmit={save} saving={saving} serverError={error} successMessage={success} /></div>}</>;
}
