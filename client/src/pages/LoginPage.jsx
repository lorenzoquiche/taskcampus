import { LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth.js";
import Alert from "../components/Alert.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const updateField = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault(); setError("");
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return setError("Ingresa un correo válido");
    if (!form.password) return setError("Ingresa tu contraseña");
    setSubmitting(true);
    try { await login({ email: form.email.trim().toLowerCase(), password: form.password }); navigate("/dashboard", { replace: true }); }
    catch (requestError) { setError(requestError.response?.data?.message || "No fue posible iniciar sesión"); }
    finally { setSubmitting(false); }
  };
  return <AuthLayout eyebrow="Bienvenido de vuelta" title="Inicia sesión" description="Accede a tu espacio académico y continúa organizando tus entregas." footer={<>¿Aún no tienes cuenta? <Link to="/register">Crear cuenta</Link></>}><form className="auth-form" onSubmit={handleSubmit} noValidate>{error && <Alert>{error}</Alert>}<FormField id="login-email" label="Correo electrónico" required name="email" type="email" autoComplete="email" placeholder="nombre@universidad.edu" value={form.email} onChange={updateField} /><FormField id="login-password" label="Contraseña" required name="password" type="password" autoComplete="current-password" placeholder="Tu contraseña" value={form.password} onChange={updateField} /><Button type="submit" disabled={submitting}>{submitting ? "Ingresando..." : <><LogIn aria-hidden="true" /> Ingresar</>}</Button></form></AuthLayout>;
}
