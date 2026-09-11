import { Save } from "lucide-react";
import { useState } from "react";
import Alert from "./Alert.jsx";
import Button from "./Button.jsx";

const emptyTask = { title: "", course: "", description: "", due_date: "", priority: "medium", status: "pending" };

function validate(values) {
  const errors = {};
  const title = values.title.trim();
  const course = values.course.trim();
  if (title.length < 3 || title.length > 100) errors.title = "Usa entre 3 y 100 caracteres.";
  if (course.length < 2 || course.length > 80) errors.course = "Usa entre 2 y 80 caracteres.";
  if (values.description.trim().length > 500) errors.description = "Máximo 500 caracteres.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.due_date)) errors.due_date = "Selecciona una fecha válida.";
  return errors;
}

export default function TaskForm({ initialValues, onSubmit, saving, serverError, successMessage }) {
  const [values, setValues] = useState(() => ({ ...emptyTask, ...initialValues }));
  const [errors, setErrors] = useState({});
  const update = ({ target }) => setValues((current) => ({ ...current, [target.name]: target.value }));
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSubmit({ ...values, title: values.title.trim(), course: values.course.trim(), description: values.description.trim() });
  };
  const fieldError = (name) => errors[name] ? `${name}-error` : undefined;
  return <form className="task-form" onSubmit={submit} noValidate>{serverError && <Alert>{serverError}</Alert>}{successMessage && <Alert type="success">{successMessage}</Alert>}<div className="form-field"><label htmlFor="title">Título <span aria-hidden="true">*</span></label><input id="title" name="title" value={values.title} onChange={update} aria-invalid={Boolean(errors.title)} aria-describedby={fieldError("title")} />{errors.title && <small className="field-error" id="title-error">{errors.title}</small>}</div><div className="form-field"><label htmlFor="course">Curso <span aria-hidden="true">*</span></label><input id="course" name="course" value={values.course} onChange={update} aria-invalid={Boolean(errors.course)} aria-describedby={fieldError("course")} />{errors.course && <small className="field-error" id="course-error">{errors.course}</small>}</div><div className="form-field task-form__full"><label htmlFor="description">Descripción</label><textarea id="description" name="description" rows="5" maxLength="500" value={values.description} onChange={update} aria-invalid={Boolean(errors.description)} aria-describedby={fieldError("description")} />{errors.description && <small className="field-error" id="description-error">{errors.description}</small>}<small>{values.description.length}/500</small></div><div className="form-field"><label htmlFor="due_date">Fecha de entrega <span aria-hidden="true">*</span></label><input id="due_date" name="due_date" type="date" value={values.due_date} onChange={update} aria-invalid={Boolean(errors.due_date)} aria-describedby={fieldError("due_date")} />{errors.due_date && <small className="field-error" id="due_date-error">{errors.due_date}</small>}</div><div className="form-field"><label htmlFor="priority">Prioridad</label><select id="priority" name="priority" value={values.priority} onChange={update}><option value="low">Baja</option><option value="medium">Media</option><option value="high">Alta</option></select></div><div className="form-field"><label htmlFor="status">Estado</label><select id="status" name="status" value={values.status} onChange={update}><option value="pending">Pendiente</option><option value="in_progress">En progreso</option><option value="completed">Completada</option></select></div><div className="task-form__actions"><Button type="submit" disabled={saving}><Save aria-hidden="true" />{saving ? "Guardando..." : "Guardar tarea"}</Button></div></form>;
}
