import { useEffect, useState } from "react";
import { adminAPI, categoriesAPI } from "../../../services/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function loadCategories() {
    const res = await categoriesAPI.getAll();
    setCategories(res.data || []);
  }

  useEffect(() => {
    loadCategories().catch((err) => setError(err.message));
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await adminAPI.createCategory({ name });
      setName("");
      await loadCategories();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Admin Categories</h1>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" required />
        <button type="submit">Add</button>
      </form>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </main>
  );
}
