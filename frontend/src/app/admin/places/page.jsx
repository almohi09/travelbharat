import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminAPI, placesAPI } from "../../../services/api";

export default function AdminPlacesPage() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [moderationNotes, setModerationNotes] = useState({});
  const [histories, setHistories] = useState({});

  async function loadPlaces() {
    const res = await placesAPI.getAll({ limit: 100, verificationStatus: verificationStatus || undefined });
    setPlaces(res.data?.items || []);
  }

  useEffect(() => {
    loadPlaces().catch((err) => setError(err.message));
  }, [verificationStatus]);

  async function onDelete(id) {
    try {
      await adminAPI.deletePlace(id);
      await loadPlaces();
    } catch (err) {
      setError(err.message);
    }
  }

  async function onModerate(id, status) {
    try {
      await adminAPI.moderatePlace(id, { status, notes: moderationNotes[id] || "" });
      await loadPlaces();
    } catch (err) {
      setError(err.message);
    }
  }

  async function onLoadHistory(id) {
    try {
      const res = await adminAPI.getModerationHistory(id);
      setHistories((prev) => ({ ...prev, [id]: res.data?.moderationHistory || [] }));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container">
      <div className="section-head">
        <h1 className="section-title">Admin Places</h1>
        <Link className="btn btn-primary" to="/admin/places/new">Create New Place</Link>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <label>
          Moderation status
          <select className="select" value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
      </div>

      {error ? <div className="alert alert-error">{error}</div> : null}

      <div className="grid">
        {places.map((place) => (
          <section className="card" key={place._id}>
            <div className="inline-actions" style={{ justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>{place.name}</h3>
              <span className="badge">{place.verificationStatus || "pending"}</span>
            </div>

            <div className="inline-actions" style={{ marginTop: 10 }}>
              <Link className="btn btn-ghost" to={`/admin/places/${place._id}/edit`}>Edit</Link>
              <button className="btn btn-danger" type="button" onClick={() => onDelete(place._id)}>Delete</button>
            </div>

            <div className="inline-actions" style={{ marginTop: 10 }}>
              <input
                className="input"
                placeholder="Moderation notes"
                value={moderationNotes[place._id] || ""}
                onChange={(e) => setModerationNotes((prev) => ({ ...prev, [place._id]: e.target.value }))}
                style={{ maxWidth: 340 }}
              />
              <button className="btn btn-primary" type="button" onClick={() => onModerate(place._id, "verified")}>Verify</button>
              <button className="btn btn-ghost" type="button" onClick={() => onModerate(place._id, "rejected")}>Reject</button>
              <button className="btn btn-ghost" type="button" onClick={() => onLoadHistory(place._id)}>View History</button>
            </div>

            {(histories[place._id] || []).length ? (
              <div className="grid" style={{ marginTop: 12 }}>
                {histories[place._id].map((entry, idx) => (
                  <div className="card" style={{ boxShadow: "none" }} key={`${place._id}-${idx}`}>
                    {entry.status}
                    {entry.notes ? ` - ${entry.notes}` : ""}
                    {entry.moderatedAt ? ` (${new Date(entry.moderatedAt).toLocaleString()})` : ""}
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </main>
  );
}
