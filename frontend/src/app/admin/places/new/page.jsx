import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../../../../services/api";
import PlaceForm from "../../../../components/admin/PlaceForm";

export default function NewPlacePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(form) {
    setError("");
    setSaving(true);
    try {
      await adminAPI.createPlace({
        ...form,
        categories: form.categorySlugs
      });
      navigate("/admin/places");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="container">
      <div className="section-head">
        <h1 className="section-title">Create Place</h1>
      </div>
      {error ? <div className="alert alert-error">{error}</div> : null}
      <PlaceForm onSubmit={onSubmit} submitLabel="Create Place" submitting={saving} />
    </main>
  );
}
