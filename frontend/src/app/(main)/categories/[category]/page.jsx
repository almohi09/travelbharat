import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoriesAPI } from "../../../../services/api";

export default function CategoryPage() {
  const { category } = useParams();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await categoriesAPI.getPlaces(category);
        setPlaces(res.data || []);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [category]);

  return (
    <main style={{ padding: 24 }}>
      <h1>Category: {category}</h1>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      <ul>
        {places.map((place) => (
          <li key={place._id}>
            <Link to={`/places/${place.slug}`}>{place.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
