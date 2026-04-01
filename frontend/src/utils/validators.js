export function isEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
}

export function minLength(value = "", length = 1) {
  return String(value).trim().length >= length;
}

export function required(value) {
  return String(value ?? "").trim().length > 0;
}
