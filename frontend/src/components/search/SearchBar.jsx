export default function SearchBar({ value, onChange, placeholder = "Search places, states, or categories..." }) {
  return <input className="input" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />;
}
