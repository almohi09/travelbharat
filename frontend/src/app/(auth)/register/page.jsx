import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", inviteCode: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
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
        <h1>Admin Registration</h1>
        <p className="muted">First account becomes superadmin. After that, registration requires owner invite code.</p>
        <form className="form-grid" onSubmit={onSubmit}>
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
          <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
          <input
            className="input"
            placeholder="Invite code (required after first account)"
            value={form.inviteCode}
            onChange={(e) => setForm((p) => ({ ...p, inviteCode: e.target.value }))}
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
          {error ? <div className="alert alert-error">{error}</div> : null}
        </form>
        <p className="muted" style={{ marginTop: 12 }}>
          Already have account? <Link to="/login" style={{ color: "var(--primary)", fontWeight: 700 }}>Login</Link>
        </p>
      </section>
    </main>
  );
}
