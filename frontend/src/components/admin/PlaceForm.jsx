import { useEffect, useMemo, useState } from "react";
import { adminAPI, categoriesAPI, statesAPI } from "../../services/api";

const BEST_TIME_OPTIONS = [
  "October to March",
  "November to February",
  "December to February",
  "March to June",
  "July to September",
  "Year round"
];

function normalizeList(items) {
  return (Array.isArray(items) ? items : []).map((item) => String(item || "").trim());
}

export default function PlaceForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
  submitting = false
}) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [error, setError] = useState("");
  const [newCityName, setNewCityName] = useState("");
  const [useCustomBestTime, setUseCustomBestTime] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [form, setForm] = useState({
    name: "",
    summary: "",
    description: "",
    stateSlug: "",
    citySlug: "",
    categorySlugs: [],
    images: [""],
    bestTimeToVisit: "",
    entryFee: "",
    timings: "",
    mapLink: "",
    nearbyAttractions: [""],
    isFeatured: false
  });

  const bestTimeSelectValue = useMemo(() => {
    if (useCustomBestTime) return "__custom__";
    return form.bestTimeToVisit || "";
  }, [form.bestTimeToVisit, useCustomBestTime]);

  useEffect(() => {
    async function loadOptions() {
      try {
        setLoadingOptions(true);
        setError("");
        const [statesRes, categoriesRes] = await Promise.all([statesAPI.getAll({ limit: 100 }), categoriesAPI.getAll()]);
        setStates(statesRes.data?.items || []);
        setCategories(categoriesRes.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingOptions(false);
      }
    }
    loadOptions();
  }, []);

  useEffect(() => {
    if (!initialValues) return;
    setForm((prev) => ({
      ...prev,
      ...initialValues,
      categorySlugs: normalizeList(initialValues.categorySlugs || []),
      images: normalizeList(initialValues.images || []).length ? normalizeList(initialValues.images || []) : [""],
      nearbyAttractions: normalizeList(initialValues.nearbyAttractions || []).length
        ? normalizeList(initialValues.nearbyAttractions || [])
        : [""]
    }));
    setUseCustomBestTime(
      Boolean(initialValues.bestTimeToVisit) && !BEST_TIME_OPTIONS.includes(String(initialValues.bestTimeToVisit))
    );
  }, [initialValues]);

  useEffect(() => {
    async function loadCities() {
      if (!form.stateSlug) {
        setCities([]);
        setForm((prev) => ({ ...prev, citySlug: "" }));
        return;
      }
      try {
        const res = await statesAPI.getCities(form.stateSlug);
        const nextCities = res.data || [];
        setCities(nextCities);
        if (!nextCities.some((city) => city.slug === form.citySlug)) {
          setForm((prev) => ({ ...prev, citySlug: "" }));
        }
      } catch (err) {
        setError(err.message);
      }
    }
    loadCities();
  }, [form.stateSlug]);

  function updateListField(field, index, value) {
    setForm((prev) => {
      const next = [...prev[field]];
      next[index] = value;
      return { ...prev, [field]: next };
    });
  }

  function addListField(field) {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  }

  function removeListField(field, index) {
    setForm((prev) => {
      const next = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: next.length ? next : [""] };
    });
  }

  function toggleCategory(slug) {
    setForm((prev) => {
      const exists = prev.categorySlugs.includes(slug);
      return {
        ...prev,
        categorySlugs: exists ? prev.categorySlugs.filter((item) => item !== slug) : [...prev.categorySlugs, slug]
      };
    });
  }

  async function handleCreateCity() {
    if (!form.stateSlug || !newCityName.trim()) return;
    try {
      setError("");
      await adminAPI.createCity({ name: newCityName.trim(), stateSlug: form.stateSlug });
      const res = await statesAPI.getCities(form.stateSlug);
      const nextCities = res.data || [];
      setCities(nextCities);
      const created = nextCities.find((city) => city.name.toLowerCase() === newCityName.trim().toLowerCase());
      if (created) {
        setForm((prev) => ({ ...prev, citySlug: created.slug }));
      }
      setNewCityName("");
    } catch (err) {
      setError(err.message);
    }
  }

  function appendImageUrls(urls) {
    setForm((prev) => {
      const current = prev.images.map((item) => item.trim()).filter(Boolean);
      const merged = [...current, ...urls.filter(Boolean)];
      return { ...prev, images: merged.length ? merged : [""] };
    });
  }

  async function handleUploadImages() {
    if (!selectedFiles.length) return;
    try {
      setError("");
      setUploadingImages(true);
      const payload = new FormData();
      selectedFiles.forEach((file) => payload.append("images", file));
      if (form.name) payload.append("placeName", form.name);
      if (form.stateSlug) payload.append("stateSlug", form.stateSlug);

      const res = await adminAPI.uploadImages(payload);
      const uploadedUrls = (res.data?.items || []).map((item) => item.url).filter(Boolean);
      appendImageUrls(uploadedUrls);
      setSelectedFiles([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingImages(false);
    }
  }

  function autofillMapLink() {
    const parts = [form.name];
    const cityName = cities.find((city) => city.slug === form.citySlug)?.name;
    const stateName = states.find((state) => state.slug === form.stateSlug)?.name;
    if (cityName) parts.push(cityName);
    if (stateName) parts.push(stateName);
    parts.push("India");
    const query = parts.filter(Boolean).join(", ");
    if (!query) return;
    setForm((prev) => ({ ...prev, mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await onSubmit({
        ...form,
        categorySlugs: form.categorySlugs.filter(Boolean),
        images: form.images.map((item) => item.trim()).filter(Boolean),
        nearbyAttractions: form.nearbyAttractions.map((item) => item.trim()).filter(Boolean)
      });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      {error ? <div className="alert alert-error">{error}</div> : null}
      {loadingOptions ? <p className="muted">Loading states and categories...</p> : null}

      <input
        className="input"
        placeholder="Place name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        required
      />
      <input
        className="input"
        placeholder="Summary"
        value={form.summary}
        onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
      />
      <textarea
        className="textarea"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
      />

      <select
        className="select"
        value={form.stateSlug}
        onChange={(e) => setForm((prev) => ({ ...prev, stateSlug: e.target.value }))}
        required
      >
        <option value="">Select state</option>
        {states.map((state) => (
          <option key={state._id} value={state.slug}>
            {state.name}
          </option>
        ))}
      </select>

      <div className="inline-actions">
        <select
          className="select"
          style={{ flex: 1, minWidth: 220 }}
          value={form.citySlug}
          onChange={(e) => setForm((prev) => ({ ...prev, citySlug: e.target.value }))}
          disabled={!form.stateSlug}
        >
          <option value="">Select city (optional)</option>
          {cities.map((city) => (
            <option key={city._id} value={city.slug}>
              {city.name}
            </option>
          ))}
        </select>
        <input
          className="input"
          style={{ flex: 1, minWidth: 160 }}
          placeholder="New city name"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
          disabled={!form.stateSlug}
        />
        <button
          className="btn btn-ghost"
          type="button"
          onClick={handleCreateCity}
          disabled={!form.stateSlug || !newCityName.trim()}
        >
          Add City
        </button>
      </div>

      <section className="card" style={{ boxShadow: "none" }}>
        <h3>Categories</h3>
        <div className="grid grid-2">
          {categories.map((category) => (
            <label key={category._id} className="inline-actions">
              <input
                type="checkbox"
                checked={form.categorySlugs.includes(category.slug)}
                onChange={() => toggleCategory(category.slug)}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="card" style={{ boxShadow: "none" }}>
        <h3>Images</h3>
        <div className="inline-actions" style={{ marginBottom: 10 }}>
          <input
            className="input"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
            onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleUploadImages}
            disabled={!selectedFiles.length || uploadingImages}
          >
            {uploadingImages ? "Uploading..." : "Upload Selected"}
          </button>
        </div>
        {selectedFiles.length ? <p className="muted">{selectedFiles.length} file(s) selected</p> : null}
        <div className="grid">
          {form.images.map((image, index) => (
            <div className="inline-actions" key={`image-${index}`}>
              <input
                className="input"
                style={{ flex: 1 }}
                placeholder="Image URL"
                value={image}
                onChange={(e) => updateListField("images", index, e.target.value)}
              />
              <button className="btn btn-ghost" type="button" onClick={() => removeListField("images", index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="btn btn-ghost" type="button" onClick={() => addListField("images")}>
            Add Image URL
          </button>
        </div>
      </section>

      <select
        className="select"
        value={bestTimeSelectValue}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "__custom__") {
            setUseCustomBestTime(true);
            if (BEST_TIME_OPTIONS.includes(form.bestTimeToVisit)) {
              setForm((prev) => ({ ...prev, bestTimeToVisit: "" }));
            }
            return;
          }
          setUseCustomBestTime(false);
          setForm((prev) => ({ ...prev, bestTimeToVisit: value }));
        }}
      >
        <option value="">Best time to visit (optional)</option>
        {BEST_TIME_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        <option value="__custom__">Custom value</option>
      </select>

      {useCustomBestTime ? (
        <input
          className="input"
          placeholder="Custom best time to visit"
          value={form.bestTimeToVisit}
          onChange={(e) => setForm((prev) => ({ ...prev, bestTimeToVisit: e.target.value }))}
        />
      ) : null}

      <input
        className="input"
        placeholder="Entry fee"
        value={form.entryFee}
        onChange={(e) => setForm((prev) => ({ ...prev, entryFee: e.target.value }))}
      />
      <input
        className="input"
        placeholder="Timings"
        value={form.timings}
        onChange={(e) => setForm((prev) => ({ ...prev, timings: e.target.value }))}
      />

      <div className="inline-actions">
        <input
          className="input"
          style={{ flex: 1 }}
          placeholder="Map link (Google Maps URL)"
          value={form.mapLink}
          onChange={(e) => setForm((prev) => ({ ...prev, mapLink: e.target.value }))}
        />
        <button className="btn btn-ghost" type="button" onClick={autofillMapLink}>
          Auto-fill Map Link
        </button>
      </div>

      <section className="card" style={{ boxShadow: "none" }}>
        <h3>Nearby Attractions</h3>
        <div className="grid">
          {form.nearbyAttractions.map((item, index) => (
            <div className="inline-actions" key={`nearby-${index}`}>
              <input
                className="input"
                style={{ flex: 1 }}
                placeholder="Nearby attraction name"
                value={item}
                onChange={(e) => updateListField("nearbyAttractions", index, e.target.value)}
              />
              <button className="btn btn-ghost" type="button" onClick={() => removeListField("nearbyAttractions", index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="btn btn-ghost" type="button" onClick={() => addListField("nearbyAttractions")}>
            Add Attraction
          </button>
        </div>
      </section>

      <label className="inline-actions">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))}
        />
        <span>Featured place</span>
      </label>

      <button className="btn btn-primary" type="submit" disabled={submitting || loadingOptions}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
