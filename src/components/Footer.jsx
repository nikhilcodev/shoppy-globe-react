import "./Footer.css"

/**
 * Footer component — displays copyright info and navigation links
 * separated from the page content by a top border.
 */
export default function Footer() {
	return (
		<footer className="">
			<div className="footer-container">
				{/* Copyright notice */}
				<span className="footer-content">
					© 2026{" "}
					<a href="#" className="footer-brand">
						Shoppy Globe™
					</a>
					. All Rights Reserved.
				</span>

				{/* Navigation links */}
				<ul className="footer-links">
					<li>
						<a href="#" className="footer-link">
							About
						</a>
					</li>
					<li>
						<a href="#" className="footer-link">
							Privacy Policy
						</a>
					</li>
					<li>
						<a href="#" className="footer-link">
							Licensing
						</a>
					</li>
					<li>
						<a href="#" className="footer-link">
							Contact
						</a>
					</li>
				</ul>
			</div>
		</footer>
	)
}
