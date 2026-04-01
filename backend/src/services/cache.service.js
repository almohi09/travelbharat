const cacheStore = new Map();

function setCache(key, value, ttlMs = 5 * 60 * 1000) {
  cacheStore.set(key, {
    value,
    expiresAt: Date.now() + ttlMs
  });
}

function getCache(key) {
  const item = cacheStore.get(key);
  if (!item) return null;
  if (item.expiresAt < Date.now()) {
    cacheStore.delete(key);
    return null;
  }
  return item.value;
}

function deleteCache(key) {
  cacheStore.delete(key);
}

function clearCache() {
  cacheStore.clear();
}

module.exports = {
  setCache,
  getCache,
  deleteCache,
  clearCache
};
