export default function ImageGallery({ images = [] }) {
  if (!images.length) return <p className="muted">No images available.</p>;

  return (
    <div className="grid grid-3">
      {images.map((image, index) => (
        <img
          key={`${image}-${index}`}
          src={image}
          alt={`Place image ${index + 1}`}
          style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12, border: "1px solid var(--border)" }}
          loading="lazy"
        />
      ))}
    </div>
  );
}
