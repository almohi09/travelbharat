import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { placesAPI, statesAPI } from "../../../../../services/api";

export default function CityDetailPage() {
  const { stateSlug, citySlug } = useParams();
  const [cityName, setCityName] = useState(citySlug);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [citiesRes, placesRes] = await Promise.all([statesAPI.getCities(stateSlug), placesAPI.getAll({ limit: 100 })]);
        const matchedCity = (citiesRes.data || []).find((city) => city.slug === citySlug);
        if (matchedCity) setCityName(matchedCity.name);

        const filtered = (placesRes.data?.items || []).filter((place) => place.city?.slug === citySlug);
        setPlaces(filtered);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [stateSlug, citySlug]);

  return (
    <main style={{ padding: 24 }}>
      <h1>{cityName}</h1>
      <p>State: {stateSlug}</p>
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
