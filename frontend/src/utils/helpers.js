export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

export function sleep(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
