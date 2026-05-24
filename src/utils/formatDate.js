/**
 * formatDate — formats an ISO date string into a human-readable format.
 * @param {string} dateStr - The ISO date string to format.
 * @param {{ dateOnly?: boolean }} options - If dateOnly is true, returns date without time.
 * @returns {string} Formatted date string, or "Unknown date" if invalid.
 */
export function formatDate(dateStr, options = {}) {
	const d = new Date(dateStr)

	// Return fallback if the date string is invalid
	if (isNaN(d)) return "Unknown date"

	return options.dateOnly ? d.toLocaleDateString() : d.toLocaleString()
}
