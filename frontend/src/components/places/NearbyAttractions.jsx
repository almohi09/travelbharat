export default function NearbyAttractions({ items = [] }) {
  if (!items.length) return <p className="muted">No nearby attractions listed.</p>;

  return (
    <div className="grid grid-3">
      {items.map((item, index) => (
        <div className="card" key={`${item}-${index}`}>
          <h4 style={{ marginBottom: 0 }}>{item}</h4>
        </div>
      ))}
    </div>
  );
}
