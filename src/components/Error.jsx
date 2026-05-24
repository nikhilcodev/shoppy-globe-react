import "./Error.css"

/**
 * Error component — displays an X icon and an error message.
 * @param {string} message - The error text to display. Defaults to "Something went wrong."
 */
export default function Error({ message = "Something went wrong." }) {
	return (
		<div className="error-container">
			{/* X icon (cross) built from two diagonal lines */}
			<svg
				className="w-12 h-12 mb-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
				/>
			</svg>

			{/* Error message */}
			<p>{message}</p>
		</div>
	)
}
