const DEFAULT_OPTIONS = { day: "numeric", month: "long", year: "numeric" };

/**
 * Locale-aware date formatting.
 * @param {string | number | Date} date
 * @param {{ withWeekday?: boolean }} [options]
 */
export function formatDate(date, { withWeekday = false } = {}) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    ...DEFAULT_OPTIONS,
    ...(withWeekday && { weekday: "long" }),
  }).format(new Date(date));
}
