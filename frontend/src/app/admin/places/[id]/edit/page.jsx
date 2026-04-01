import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminAPI, placesAPI } from "../../../../../services/api";
import PlaceForm from "../../../../../components/admin/PlaceForm";

export default function EditPlacePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await placesAPI.getAll({ limit: 100 });
        const place = (res.data?.items || []).find((item) => item._id === id);
        if (!place) throw new Error("Place not found");
        setInitialValues({
          name: place.name || "",
          summary: place.summary || "",
          description: place.description || "",
          stateSlug: place.state?.slug || "",
          citySlug: place.city?.slug || "",
          categorySlugs: (place.categories || []).map((category) => category.slug).filter(Boolean),
          bestTimeToVisit: place.bestTimeToVisit || "",
          entryFee: place.entryFee || "",
          timings: place.timings || "",
          mapLink: place.mapLink || "",
          images: place.images || [],
          nearbyAttractions: place.nearbyAttractions || [],
          isFeatured: Boolean(place.isFeatured)
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function onSubmit(form) {
    setError("");
    setSaving(true);
    try {
      await adminAPI.updatePlace(id, {
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

  if (loading) return <p className="container muted">Loading place...</p>;

  return (
    <main className="container">
      <div className="section-head">
        <h1 className="section-title">Edit Place</h1>
      </div>
      {error ? <div className="alert alert-error">{error}</div> : null}
      {initialValues ? (
        <PlaceForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          submitLabel="Save Changes"
          submitting={saving}
        />
      ) : (
        <p className="muted">Place details are unavailable.</p>
      )}
    </main>
  );
}
