import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import usePlaces from "../../../hooks/usePlaces";
import { categoriesAPI, statesAPI } from "../../../services/api";
import FilterPanel from "../../../components/search/FilterPanel";
import StateMap from "../../../components/states/StateMap";

export default function PlacesPage() {
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    state: "",
    category: "",
    city: "",
    featured: false
  });
  const [metaError, setMetaError] = useState("");

  const params = useMemo(
    () => ({
      limit: 24,
      verificationStatus: "verified",
      search: filters.search || undefined,
      state: filters.state || undefined,
      category: filters.category || undefined,
      city: filters.city || undefined,
      featured: filters.featured ? true : undefined
    }),
    [filters]
  );

  const { items, loading, error } = usePlaces(params);

  useEffect(() => {
    async function loadMeta() {
      const [statesRes, categoriesRes] = await Promise.all([statesAPI.getAll({ limit: 100 }), categoriesAPI.getAll()]);
      setStates(statesRes.data?.items || []);
      setCategories(categoriesRes.data || []);
    }
    loadMeta().catch((err) => setMetaError(err.message));
  }, []);

  useEffect(() => {
    async function loadCities() {
      if (!filters.state) {
        setCities([]);
        return;
      }
      const res = await statesAPI.getCities(filters.state);
      setCities(res.data || []);
    }
    loadCities().catch((err) => setMetaError(err.message));
  }, [filters.state]);

  function onFilterChange(key, value) {
    setFilters((prev) => {
      if (key === "state") return { ...prev, state: value, city: "" };
      return { ...prev, [key]: value };
    });
  }

  return (
    <main className="container">
      <div className="section-head">
        <h1 className="section-title">All Places</h1>
      </div>
      <FilterPanel filters={filters} onChange={onFilterChange} states={states} categories={categories} cities={cities} />
      {loading ? <p className="muted">Loading places...</p> : null}
      {error ? <div className="alert alert-error">{error}</div> : null}
      {metaError ? <div className="alert alert-error">{metaError}</div> : null}
      <div className="grid grid-3">
        {items.map((place) => (
          <Link className="card" key={place._id} to={`/places/${place.slug}`}>
            <span className="badge">{place.category?.name || place.state?.name || "Destination"}</span>
            <h3 style={{ marginTop: 10 }}>{place.name}</h3>
            <p>{place.summary || "Open place details."}</p>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <StateMap places={items} />
      </div>
    </main>
  );
}
