import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { statesAPI } from "../../../../services/api";

export default function StateDetailPage() {
  const { stateSlug } = useParams();
  const [state, setState] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [stateRes, placesRes] = await Promise.all([
          statesAPI.getBySlug(stateSlug),
          statesAPI.getPlaces(stateSlug, { verificationStatus: "verified" })
        ]);
        setState(stateRes.data);
        setPlaces(placesRes.data || []);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [stateSlug]);

  return (
    <main className="container">
      <div className="section-head">
        <h1 className="section-title">{state?.name || "State"}</h1>
      </div>
      <p className="muted">{state?.description || "Discover verified places in this state."}</p>
      {error ? <div className="alert alert-error">{error}</div> : null}
      <div className="grid grid-3">
        {places.map((place) => (
          <Link className="card" key={place._id} to={`/places/${place.slug}`}>
            <span className="badge">{place.city?.name || "Statewide"}</span>
            <h3 style={{ marginTop: 10 }}>{place.name}</h3>
            <p>{place.summary || "Open for full details."}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
