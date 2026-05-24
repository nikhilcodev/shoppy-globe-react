import "./PageTransition.css"

import { useLocation } from "react-router"
import { useState, useEffect } from "react"

/**
 * PageTransition component — wraps page content and triggers a fade+slide-up
 * animation on every route change.
 * @param {React.ReactNode} children - The page content to animate.
 */
export default function PageTransition({ children }) {
	const location = useLocation()
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		// Defer both state updates to avoid synchronous setState inside effect
		const hideTimer = setTimeout(() => setVisible(false), 0)
		const showTimer = setTimeout(() => setVisible(true), 50)

		// Cleanup both timers if component unmounts or route changes again
		return () => {
			clearTimeout(hideTimer)
			clearTimeout(showTimer)
		}
	}, [location.key])

	return (
		<div className={`page-transition ${visible ? "visible" : ""}`}>
			{children}
		</div>
	)
}
