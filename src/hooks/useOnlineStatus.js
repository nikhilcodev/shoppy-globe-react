import { useState, useEffect } from "react"

/**
 * useOnlineStatus hook — tracks the browser's network connectivity state.
 * Reloads the page after a short delay when coming back online.
 * @returns {boolean} true if the browser is online, false if offline.
 */
export default function useOnlineStatus() {
	const [isOnline, setIsOnline] = useState(navigator.onLine)

	useEffect(() => {
		const goOnline = () => {
			setIsOnline(true)
			// Small delay to let the network stabilize before reloading
			setTimeout(() => window.location.reload(), 300)
		}

		const goOffline = () => setIsOnline(false)

		window.addEventListener("online", goOnline)
		window.addEventListener("offline", goOffline)

		return () => {
			window.removeEventListener("online", goOnline)
			window.removeEventListener("offline", goOffline)
		}
	}, [])

	return isOnline
}
