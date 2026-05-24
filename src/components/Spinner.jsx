import "./Spinner.css"

/**
 * Spinner component — full screen loading overlay with animated rings, a message, and pulsing dots.
 * @param {string} message - Text shown below the spinner. Defaults to "Loading".
 */
export default function Spinner({ message = "Loading" }) {
	return (
		<div className="spinner-container">
			<div className="spinner-wrap">
				{/* Three counter-rotating amber rings with a solid center dot */}
				<div className="spinner-rings">
					<div className="ring ring-outer"></div>
					<div className="ring ring-mid"></div>
					<div className="ring ring-inner"></div>
					<div className="ring-center"></div>
				</div>

				{/* Loading message */}
				<p className="spinner-text">{message}</p>

				{/* Staggered pulsing dots */}
				<div className="spinner-dots">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	)
}
