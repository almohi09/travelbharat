/**
 * Utility function for merging classNames
 * Filters out falsy values and joins remaining strings
 * @param {...any} classes - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
