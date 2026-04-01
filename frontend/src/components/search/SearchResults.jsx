import { Link } from "react-router-dom";

export default function SearchResults({ items = [], loading = false, emptyLabel = "No results found." }) {
  if (loading) return <p className="muted">Searching...</p>;
  if (!items.length) return <p className="muted">{emptyLabel}</p>;

  return (
    <div className="grid grid-3">
      {items.map((item) => (
        <Link className="card" key={item._id} to={`/places/${item.slug}`}>
          <span className="badge">{item.state?.name || "India"}</span>
          <h3 style={{ marginTop: 10 }}>{item.name}</h3>
          <p>{item.summary || "Open detailed page"}</p>
        </Link>
      ))}
    </div>
  );
}
