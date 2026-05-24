import "./Pagination.css"

/**
 * Pagination component — previous/next controls with a current page indicator.
 * @param {number} page - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {function} onPageChange - Callback fired with the new page number.
 */
export default function Pagination({ page, totalPages, onPageChange }) {
	return (
		<div className="pagination-container">
			{/* Previous page — disabled on first page */}
			<button
				disabled={page === 1}
				onClick={() => onPageChange(page - 1)}
				className="prev-btn"
			>
				Prev
			</button>

			{/* Current page indicator */}
			<p className="target">
				Page {page} of {totalPages}
			</p>

			{/* Next page — disabled on last page */}
			<button
				disabled={page === totalPages}
				onClick={() => onPageChange(page + 1)}
				className="next-btn"
			>
				Next
			</button>
		</div>
	)
}
