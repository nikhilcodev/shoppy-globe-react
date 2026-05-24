import "./ErrorBoundary.css"

import { Component } from "react"

/**
 * ErrorBoundary — class component that catches JavaScript errors anywhere in
 * its child component tree and renders a fallback UI instead of crashing the app.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <SomeComponent />
 *   </ErrorBoundary>
 *
 * Optionally pass a custom fallback:
 *   <ErrorBoundary fallback={<MyFallback />}>
 */
export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		// Track whether an error has been caught and its message
		this.state = { hasError: false, message: null }
	}

	/**
	 * Lifecycle: called when a descendant throws during rendering.
	 * Updates state to trigger the fallback UI on the next render.
	 */
	static getDerivedStateFromError(error) {
		return { hasError: true, message: error?.message || "Something went wrong" }
	}

	/**
	 * Lifecycle: called after the error has been caught.
	 * Used for logging — does not affect rendering.
	 */
	componentDidCatch(error, info) {
		console.error("ErrorBoundary caught:", error, info)
	}

	render() {
		// Render custom fallback if provided, otherwise use the default UI
		if (this.state.hasError) {
			return (
				this.props.fallback ?? (
					<div className="error-boundary">
						<p className="error-boundary-title">Something went wrong</p>
						<p className="error-boundary-message">{this.state.message}</p>

						{/* Reset error state to allow the user to retry */}
						<button
							className="error-boundary-btn"
							onClick={() => this.setState({ hasError: false, message: null })}
						>
							Try again
						</button>
					</div>
				)
			)
		}

		{
			/* No error — render children normally */
		}
		return this.props.children
	}
}
