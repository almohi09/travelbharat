import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container" style={{ maxWidth: 520 }}>
      <section className="card">
        <h1>Admin Login</h1>
        <p className="muted">Access content moderation and destination management.</p>
        <form className="form-grid" onSubmit={onSubmit}>
          <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
          <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          {error ? <div className="alert alert-error">{error}</div> : null}
        </form>
        <p className="muted" style={{ marginTop: 12 }}>
          No account? <Link to="/register" style={{ color: "var(--primary)", fontWeight: 700 }}>Register</Link>
        </p>
      </section>
    </main>
  );
}
