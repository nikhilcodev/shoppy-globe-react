import { useNavigate } from "react-router"
import "./NotFound.css"

import useOnlineStatus from "../hooks/useOnlineStatus"
import OfflinePage from "../components/OfflinePage"

/**
 * NotFound component — 404 page with navigation back home or to the previous route.
 * Also handles the case where the router errorElement fires while offline.
 */
function NotFound() {
	const navigate = useNavigate()
	const isOnline = useOnlineStatus()

	// If the router threw while offline, show the offline page instead of 404
	if (!isOnline) return <OfflinePage />

	return (
		<div className="nf-main-container">
			{/* 404 heading */}
			<p className="nf-main-text">404</p>
			<h1 className="nf-sub-text">Page not found</h1>
			<p className="nf-error-text">
				Sorry, we couldn't find the page you're looking for.
			</p>

			{/* Navigation options */}
			<div className="nf-nav">
				<button onClick={() => navigate("/")} className="nf-home-link">
					Go home
				</button>
				<button onClick={() => navigate(-1)} className="nf-back-link">
					Go back
				</button>
			</div>
		</div>
	)
}

export default NotFound
