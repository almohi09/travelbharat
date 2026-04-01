import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { placesAPI } from "../../../../services/api";
import ImageGallery from "../../../../components/places/ImageGallery";
import NearbyAttractions from "../../../../components/places/NearbyAttractions";
import BestTimeWidget from "../../../../components/places/BestTimeWidget";

export default function PlaceDetailPage() {
  const { placeSlug } = useParams();
  const [place, setPlace] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await placesAPI.getBySlug(placeSlug);
        setPlace(res.data);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [placeSlug]);

  return (
    <main className="container">
      <Helmet>
        <title>{place?.name ? `${place.name} | TravelBharat` : "Place | TravelBharat"}</title>
        <meta name="description" content={place?.summary || "Detailed destination information on TravelBharat."} />
      </Helmet>
      <div className="section-head">
        <h1 className="section-title">{place?.name || "Place"}</h1>
      </div>
      {error ? <div className="alert alert-error">{error}</div> : null}

      <div className="grid grid-2">
        <section className="card">
          <h3>Overview</h3>
          <p>{place?.summary || "No summary available."}</p>
          <p style={{ marginTop: 10 }}>{place?.description || "No description available."}</p>
        </section>
        <section className="card">
          <h3>Travel Info</h3>
          <BestTimeWidget value={place?.bestTimeToVisit} />
          <p><strong>Entry fee:</strong> {place?.entryFee || "N/A"}</p>
          <p><strong>Timings:</strong> {place?.timings || "N/A"}</p>
          {place?.mapLink ? (
            <p style={{ marginTop: 8 }}>
              <a className="btn btn-primary" href={place.mapLink} target="_blank" rel="noreferrer">
                Open Map
              </a>
            </p>
          ) : null}
        </section>
      </div>

      <div className="section-head">
        <h2 className="section-title">Image Gallery</h2>
      </div>
      <ImageGallery images={place?.images || []} />

      <div className="section-head">
        <h2 className="section-title">Nearby Attractions</h2>
      </div>
      <NearbyAttractions items={place?.nearbyAttractions || []} />
    </main>
  );
}
