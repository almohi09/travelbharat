import { useEffect, useState } from "react";
import API from "../services/api";

export default function useSearch(query) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function run() {
      if (!query) {
        setItems([]);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const res = await API.get("/search", { params: { q: query } });
        setItems(res.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [query]);

  return { items, loading, error };
}
