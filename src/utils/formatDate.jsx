export function formatDate(
  date,
  options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  },
  locales = 'en-US',
) {
  return new Date(date).toLocaleDateString(locales, options);
}
