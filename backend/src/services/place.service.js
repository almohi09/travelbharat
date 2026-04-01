function buildPlaceFilter(query = {}) {
  const filter = {};

  if (query.featured === "true") {
    filter.isFeatured = true;
  }

  if (query.search) {
    const q = String(query.search).trim();
    if (q) {
      filter.$or = [{ name: { $regex: q, $options: "i" } }, { summary: { $regex: q, $options: "i" } }];
    }
  }

  return filter;
}

function getPlaceSort(sortBy = "latest") {
  if (sortBy === "name") return { name: 1 };
  if (sortBy === "oldest") return { createdAt: 1 };
  return { createdAt: -1 };
}

module.exports = {
  buildPlaceFilter,
  getPlaceSort
};
