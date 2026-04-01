import { useEffect, useState } from "react";
import { adminAPI, statesAPI } from "../../../services/api";

export default function AdminDashboardPage() {
  const [stateName, setStateName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityStateSlug, setCityStateSlug] = useState("");
  const [states, setStates] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState({
    counts: { pending: 0, verified: 0, rejected: 0, total: 0 },
    recentActivity: []
  });

  async function loadMetrics() {
    const res = await adminAPI.getModerationMetrics();
    setMetrics(res.data || { counts: { pending: 0, verified: 0, rejected: 0, total: 0 }, recentActivity: [] });
  }

  async function loadStates() {
    const res = await statesAPI.getAll({ limit: 100 });
    const items = res.data?.items || [];
    setStates(items);
    if (items.length && !cityStateSlug) {
      setCityStateSlug(items[0].slug);
    }
    return items;
  }

  useEffect(() => {
    loadMetrics().catch((err) => setError(err.message));
    loadStates().catch((err) => setError(err.message));
  }, []);

  async function createState(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await adminAPI.createState({ name: stateName });
      setMessage("State created");
      setStateName("");
      const items = await loadStates();
      if (items.length) {
        setCityStateSlug(items[items.length - 1].slug);
      }
      await loadMetrics();
    } catch (err) {
      setError(err.message);
    }
  }

  async function createCategory(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await adminAPI.createCategory({ name: categoryName });
      setMessage("Category created");
      setCategoryName("");
      await loadMetrics();
    } catch (err) {
      setError(err.message);
    }
  }

  async function createCity(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await adminAPI.createCity({ name: cityName, stateSlug: cityStateSlug });
      setMessage("City created");
      setCityName("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container">
      <div className="section-head"><h1 className="section-title">Admin Dashboard</h1></div>
      {message ? <div className="alert alert-success">{message}</div> : null}
      {error ? <div className="alert alert-error">{error}</div> : null}

      <div className="grid grid-2">
        <section className="card">
          <h3>Create State</h3>
          <form className="form-grid" onSubmit={createState}>
            <input className="input" value={stateName} onChange={(e) => setStateName(e.target.value)} placeholder="State name" required />
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </section>

        <section className="card">
          <h3>Create Category</h3>
          <form className="form-grid" onSubmit={createCategory}>
            <input className="input" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Category name" required />
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </section>

        <section className="card">
          <h3>Create City</h3>
          <form className="form-grid" onSubmit={createCity}>
            <select className="select" value={cityStateSlug} onChange={(e) => setCityStateSlug(e.target.value)} required>
              <option value="">Select state</option>
              {states.map((state) => (
                <option key={state._id} value={state.slug}>
                  {state.name}
                </option>
              ))}
            </select>
            <input className="input" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="City name" required />
            <button className="btn btn-primary" type="submit" disabled={!cityStateSlug}>Create</button>
          </form>
        </section>
      </div>

      <section className="card" style={{ marginTop: 16 }}>
        <h3>Moderation Metrics</h3>
        <div className="grid grid-2" style={{ marginBottom: 12 }}>
          <p><strong>Total:</strong> {metrics.counts.total}</p>
          <p><strong>Pending:</strong> {metrics.counts.pending}</p>
          <p><strong>Verified:</strong> {metrics.counts.verified}</p>
          <p><strong>Rejected:</strong> {metrics.counts.rejected}</p>
        </div>
        <h4>Recent Activity</h4>
        <div className="grid">
          {(metrics.recentActivity || []).map((item, index) => (
            <div className="card" style={{ boxShadow: "none" }} key={`${item.placeId}-${index}`}>
              <strong>{item.placeName}</strong> - {item.status}
              {item.notes ? ` (${item.notes})` : ""}
              {item.moderatedAt ? ` at ${new Date(item.moderatedAt).toLocaleString()}` : ""}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
