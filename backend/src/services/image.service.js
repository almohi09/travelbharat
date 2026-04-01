function normalizeImageUrls(images) {
  if (!Array.isArray(images)) return [];

  return images
    .map((image) => (typeof image === "string" ? image.trim() : ""))
    .filter(Boolean)
    .map((url) => (url.startsWith("http") ? url : `https://${url}`));
}

function pickCoverImage(images, fallback = "") {
  const normalized = normalizeImageUrls(images);
  return normalized[0] || fallback;
}

module.exports = {
  normalizeImageUrls,
  pickCoverImage
};
