export function titleCase(value = "") {
  return String(value)
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

export function formatCount(value = 0) {
  return new Intl.NumberFormat("en-IN").format(Number(value) || 0);
}
