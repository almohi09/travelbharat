export default function StateMap({ places = [] }) {
  const mappedPlaces = places.filter((place) => Boolean(place?.mapLink));

  if (!mappedPlaces.length) return null;

  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Map Discovery</h3>
      <p className="muted" style={{ marginBottom: 12 }}>Open map links for filtered destinations.</p>
      <div className="grid grid-3">
        {mappedPlaces.map((place) => (
          <a key={place._id} className="card" href={place.mapLink} target="_blank" rel="noreferrer" style={{ boxShadow: "none" }}>
            <h4>{place.name}</h4>
            <p>{place.state?.name || "India"}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
