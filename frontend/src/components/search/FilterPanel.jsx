function normalizeValue(value) {
  return value == null ? "" : String(value);
}

export default function FilterPanel({ filters, onChange, states = [], categories = [], cities = [] }) {
  return (
    <section className="card" style={{ marginBottom: 16 }}>
      <div className="grid grid-3">
        <input
          className="input"
          placeholder="Search by place"
          value={normalizeValue(filters.search)}
          onChange={(event) => onChange("search", event.target.value)}
        />

        <select className="select" value={normalizeValue(filters.state)} onChange={(event) => onChange("state", event.target.value)}>
          <option value="">All states</option>
          {states.map((state) => (
            <option key={state._id} value={state.slug}>{state.name}</option>
          ))}
        </select>

        <select className="select" value={normalizeValue(filters.city)} onChange={(event) => onChange("city", event.target.value)}>
          <option value="">All cities</option>
          {cities.map((city) => (
            <option key={city._id} value={city.slug}>{city.name}</option>
          ))}
        </select>

        <select className="select" value={normalizeValue(filters.category)} onChange={(event) => onChange("category", event.target.value)}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.slug}>{category.name}</option>
          ))}
        </select>

        <label className="inline-actions" style={{ alignSelf: "center" }}>
          <input type="checkbox" checked={Boolean(filters.featured)} onChange={(event) => onChange("featured", event.target.checked)} />
          Featured only
        </label>
      </div>
    </section>
  );
}
