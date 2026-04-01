import { useState } from "react";
import useSearch from "../../../hooks/useSearch";
import useDebounce from "../../../hooks/useDebounce";
import SearchBar from "../../../components/search/SearchBar";
import SearchResults from "../../../components/search/SearchResults";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);
  const { items, loading, error } = useSearch(debounced);

  return (
    <main className="container">
      <div className="section-head">
        <h1 className="section-title">Search Destinations</h1>
      </div>
      <p className="muted">Search by place name, category, state, or city keywords.</p>
      <SearchBar value={query} onChange={setQuery} />
      {error ? <div className="alert alert-error">{error}</div> : null}
      <div style={{ marginTop: 16 }}>
        <SearchResults items={items} loading={loading} emptyLabel={query ? "No matches found." : "Start typing to search."} />
      </div>
    </main>
  );
}
