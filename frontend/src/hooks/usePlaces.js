import { useEffect, useState } from "react";
import { placesAPI } from "../services/api";

export default function usePlaces(params = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError("");
      try {
        const res = await placesAPI.getAll(params);
        setItems(res.data?.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [JSON.stringify(params)]);

  return { items, loading, error };
}
