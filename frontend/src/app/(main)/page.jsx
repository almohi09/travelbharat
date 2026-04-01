import { Link } from "react-router-dom";
import usePlaces from "../../hooks/usePlaces";

export default function HomePage() {
  const { items, loading, error } = usePlaces({ featured: true, verificationStatus: "verified", limit: 6 });

  return (
    <main className="container">
      <section className="hero">
        <h1>Explore India State by State</h1>
        <p>
          Discover destinations, best seasons, timings, entry fees, maps, and nearby attractions in one structured platform.
        </p>
      </section>

      <div className="section-head">
        <h2 className="section-title">Quick Navigation</h2>
      </div>
      <div className="grid grid-3">
        <Link className="card" to="/states">
          <h3>Browse States</h3>
          <p>See destinations grouped by state and city.</p>
        </Link>
        <Link className="card" to="/places">
          <h3>Explore Places</h3>
          <p>Use filters for category, city, and featured content.</p>
        </Link>
        <Link className="card" to="/search">
          <h3>Search</h3>
          <p>Find places by name, state, city, or category keywords.</p>
        </Link>
      </div>

      <div className="section-head">
        <h2 className="section-title">Featured Verified Places</h2>
      </div>
      {loading ? <p className="muted">Loading featured places...</p> : null}
      {error ? <div className="alert alert-error">{error}</div> : null}
      <div className="grid grid-3">
        {items.map((place) => (
          <Link className="card" key={place._id} to={`/places/${place.slug}`}>
            <span className="badge">{place.state?.name || "India"}</span>
            <h3 style={{ marginTop: 10 }}>{place.name}</h3>
            <p>{place.summary || "Discover details, timing, and nearby attractions."}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
