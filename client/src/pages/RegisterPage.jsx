import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth.js";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateField = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (name.length < 2 || name.length > 80) {
      setError("El nombre debe tener entre 2 y 80 caracteres");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Ingresa un correo válido");
      return;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setSubmitting(true);
    try {
      await register({ name, email, password: form.password });
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "No fue posible crear la cuenta");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Crear cuenta</h1>
        {error && <p className="form-error" role="alert">{error}</p>}
        <label htmlFor="register-name">Nombre</label>
        <input id="register-name" name="name" value={form.name} onChange={updateField} />
        <label htmlFor="register-email">Correo</label>
        <input id="register-email" name="email" type="email" value={form.email} onChange={updateField} />
        <label htmlFor="register-password">Contraseña</label>
        <input id="register-password" name="password" type="password" value={form.password} onChange={updateField} />
        <button type="submit" disabled={submitting}>{submitting ? "Creando cuenta..." : "Registrarse"}</button>
        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </form>
    </main>
  );
}
