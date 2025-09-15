/**
 * format rating to 1 decimal place with /10 suffix
 * @param rating - Movie rating (0-10)
 * @returns Formatted rating string
 */
export function formatRating(rating: number): string {
  if (rating === undefined || rating === null || isNaN(rating)) {
    return "N/A";
  }
  return `${rating.toFixed(1)}/10`;
}

/**
 * format integer with thousand separators
 * @param value - Integer value to format
 * @returns Formatted number string with commas
 */
export function formatInt(value: number): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "N/A";
  }
  return value.toLocaleString("en-US");
}

/**
 * format currency value (USD)
 * @param value - Currency amount in dollars
 * @returns Formatted currency string
 */
export function formatCurrency(value: number): string {
  if (value === undefined || value === null || isNaN(value) || value === 0) {
    return "N/A";
  }

  // for large numbers, use abbreviated format
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }

  return `$${value.toLocaleString("en-US")}`;
}
