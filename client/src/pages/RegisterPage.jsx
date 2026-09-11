import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth.js";
import Alert from "../components/Alert.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";

export default function RegisterPage() {
  const { register } = useAuth(); const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);
  const updateField = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault(); setError(""); const name = form.name.trim(); const email = form.email.trim().toLowerCase();
    if (name.length < 2 || name.length > 80) return setError("El nombre debe tener entre 2 y 80 caracteres");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Ingresa un correo válido");
    if (form.password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");
    setSubmitting(true);
    try { await register({ name, email, password: form.password }); navigate("/dashboard", { replace: true }); }
    catch (requestError) { setError(requestError.response?.data?.message || "No fue posible crear la cuenta"); }
    finally { setSubmitting(false); }
  };
  return <AuthLayout eyebrow="Comienza a organizarte" title="Crea tu cuenta" description="Configura tu espacio personal para mantener tus pendientes académicos en orden." footer={<>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></>}><form className="auth-form" onSubmit={handleSubmit} noValidate>{error && <Alert>{error}</Alert>}<FormField id="register-name" label="Nombre completo" required name="name" autoComplete="name" placeholder="Tu nombre" value={form.name} onChange={updateField} /><FormField id="register-email" label="Correo electrónico" required name="email" type="email" autoComplete="email" placeholder="nombre@universidad.edu" value={form.email} onChange={updateField} /><FormField id="register-password" label="Contraseña" required hint="Mínimo 8 caracteres" name="password" type="password" autoComplete="new-password" placeholder="Crea una contraseña segura" value={form.password} onChange={updateField} /><Button type="submit" disabled={submitting}>{submitting ? "Creando cuenta..." : <><UserPlus aria-hidden="true" /> Crear cuenta</>}</Button></form></AuthLayout>;
}
