import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth.js";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateField = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Ingresa un correo válido");
      return;
    }

    if (!form.password) {
      setError("Ingresa tu contraseña");
      return;
    }

    setSubmitting(true);
    try {
      await login({ email: form.email.trim().toLowerCase(), password: form.password });
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "No fue posible iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Iniciar sesión</h1>
        {error && <p className="form-error" role="alert">{error}</p>}
        <label htmlFor="login-email">Correo</label>
        <input id="login-email" name="email" type="email" value={form.email} onChange={updateField} />
        <label htmlFor="login-password">Contraseña</label>
        <input id="login-password" name="password" type="password" value={form.password} onChange={updateField} />
        <button type="submit" disabled={submitting}>{submitting ? "Ingresando..." : "Ingresar"}</button>
        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </form>
    </main>
  );
}
