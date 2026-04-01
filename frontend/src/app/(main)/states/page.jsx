import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { statesAPI } from "../../../services/api";

export default function StatesPage() {
  const [states, setStates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await statesAPI.getAll({ limit: 100 });
        setStates(res.data?.items || []);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  return (
    <main className="container">
      <div className="section-head">
        <h1 className="section-title">Indian States & UTs</h1>
      </div>
      <p className="muted">Select a state to view verified destinations and city-wise places.</p>
      {error ? <div className="alert alert-error">{error}</div> : null}
      <div className="grid grid-3">
        {states.map((state) => (
          <Link className="card" key={state._id} to={`/states/${state.slug}`}>
            <h3>{state.name}</h3>
            <p>{state.description || "Explore cities and tourist places in this state."}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
