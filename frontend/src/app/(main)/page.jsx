import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import usePlaces from "../../hooks/usePlaces";
import { categoriesAPI, statesAPI } from "../../services/api";

const REGION_CONFIG = [
  { name: "North", states: ["chandigarh", "delhi", "haryana", "himachal-pradesh", "jammu-and-kashmir", "ladakh", "punjab", "rajasthan", "uttar-pradesh", "uttarakhand"] },
  { name: "North East", states: ["arunachal-pradesh", "assam", "manipur", "meghalaya", "mizoram", "nagaland", "sikkim", "tripura"] },
  { name: "East", states: ["andaman-and-nicobar-islands", "bihar", "jharkhand", "odisha", "west-bengal"] },
  { name: "Central", states: ["chhattisgarh", "madhya-pradesh"] },
  { name: "West", states: ["dadra-and-nagar-haveli-and-daman-and-diu", "goa", "gujarat", "maharashtra"] },
  { name: "South", states: ["andhra-pradesh", "karnataka", "kerala", "lakshadweep", "puducherry", "tamil-nadu", "telangana"] }
];

const SPOTLIGHT_CITIES = ["Jaipur", "Varanasi", "Udaipur", "Leh", "Kochi", "Gangtok", "Rishikesh", "Hampi", "Madurai", "Shillong"];

export default function HomePage() {
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [metaError, setMetaError] = useState("");
  const { items, loading, error } = usePlaces({ featured: true, verificationStatus: "verified", limit: 8 });

  useEffect(() => {
    async function loadMeta() {
      try {
        const [statesRes, categoriesRes] = await Promise.all([statesAPI.getAll({ limit: 100 }), categoriesAPI.getAll()]);
        setStates(statesRes.data?.items || []);
        setCategories(categoriesRes.data || []);
      } catch (err) {
        setMetaError(err.message);
      }
    }
    loadMeta();
  }, []);

  const regionCards = useMemo(
    () =>
      REGION_CONFIG.map((region) => {
        const matched = states.filter((state) => region.states.includes(state.slug));
        return {
          name: region.name,
          count: matched.length,
          preview: matched.slice(0, 3).map((state) => state.name)
        };
      }),
    [states]
  );

  return (
    <main className="container">
      <section className="landing-hero">
        <div className="landing-overlay" />
        <div className="landing-content">
          <p className="kicker">Dekho Apna Desh</p>
          <h1>Experience India through destinations, stories, and living culture</h1>
          <p className="landing-copy">
            Plan journeys across every state and union territory with verified places, city picks, travel details, and experience themes.
          </p>
          <div className="inline-actions landing-actions">
            <Link className="btn btn-primary btn-lg" to="/places">
              Explore Destinations
            </Link>
            <Link className="btn btn-ghost btn-lg hero-ghost" to="/states">
              Browse States & UTs
            </Link>
          </div>
          <div className="city-strip">
            {SPOTLIGHT_CITIES.map((city) => (
              <Link className="city-pill city-pill-dark" key={city} to={`/search?q=${encodeURIComponent(city)}`}>
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">Destinations by Region</h2>
            <p className="section-subtitle">Regional gateways inspired by India’s official tourism map.</p>
          </div>
          <Link className="btn btn-ghost" to="/states">
            View All States
          </Link>
        </div>
        <div className="grid grid-3">
          {regionCards.map((region) => (
            <Link key={region.name} className="card region-card" to="/states">
              <p className="region-name">{region.name}</p>
              <h3>{region.count} States / UTs</h3>
              <p>{region.preview.length ? region.preview.join(" • ") : "Loading regional destinations..."}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">Experiences</h2>
            <p className="section-subtitle">Choose a travel style and jump directly to curated categories.</p>
          </div>
        </div>
        {metaError ? <div className="alert alert-error">{metaError}</div> : null}
        <div className="grid grid-4">
          {categories.slice(0, 12).map((category) => (
            <Link key={category._id} className="card experience-card" to={`/categories/${category.slug}`}>
              <span className="badge">{category.name}</span>
              <h3>{category.name} Trails</h3>
              <p>Explore destinations tagged under {category.name.toLowerCase()} experiences.</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">Featured Destinations</h2>
            <p className="section-subtitle">Handpicked places with practical planning details.</p>
          </div>
          <Link className="btn btn-ghost" to="/search">
            Search Trips
          </Link>
        </div>
        {loading ? <p className="muted">Loading featured places...</p> : null}
        {error ? <div className="alert alert-error">{error}</div> : null}
        <div className="grid grid-4">
          {items.map((place) => (
            <Link className="destination-tile" key={place._id} to={`/places/${place.slug}`}>
              <div
                className="destination-media"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(6,17,22,0.05), rgba(6,17,22,0.78)), url('${place.images?.[0] || ""}')`
                }}
              />
              <div className="destination-content">
                <span className="badge badge-accent">{place.state?.name || "India"}</span>
                <h3>{place.name}</h3>
                <p>{place.summary || "Open destination details, timings, map, and nearby attractions."}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
