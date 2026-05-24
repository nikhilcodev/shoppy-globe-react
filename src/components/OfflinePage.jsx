import "./OfflinePage.css"

/**
 * OfflinePage component — full screen fallback shown when the user loses network connectivity.
 */
export default function OfflinePage() {
	return (
		<div className="offline-container">
			{/* Satellite icon */}
			<p className="offline-icon">📡</p>

			{/* Heading */}
			<h1 className="offline-title">You're offline</h1>

			{/* Subtext */}
			<p className="offline-message">Check your connection and try again.</p>

			{/* Reload the page on click */}
			<button onClick={() => window.location.reload()} className="offline-btn">
				Retry
			</button>
		</div>
	)
}
