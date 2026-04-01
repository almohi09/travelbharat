import { useEffect, useState } from "react";
import { adminAPI, statesAPI } from "../../../services/api";

export default function AdminStatesPage() {
  const [states, setStates] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function loadStates() {
    const res = await statesAPI.getAll({ limit: 100 });
    setStates(res.data?.items || []);
  }

  useEffect(() => {
    loadStates().catch((err) => setError(err.message));
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await adminAPI.createState({ name });
      setName("");
      await loadStates();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Admin States</h1>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New state name" required />
        <button type="submit">Add</button>
      </form>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      <ul>
        {states.map((state) => (
          <li key={state._id}>{state.name}</li>
        ))}
      </ul>
    </main>
  );
}
