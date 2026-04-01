function sanitizeSearchQuery(raw = "") {
  return String(raw).trim().slice(0, 120);
}

function buildSearchRegex(query) {
  const value = sanitizeSearchQuery(query);
  return value ? new RegExp(value, "i") : null;
}

module.exports = {
  sanitizeSearchQuery,
  buildSearchRegex
};
