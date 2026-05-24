import "./Navbar.css"

import { Link } from "react-router"

import Cart from "../assets/cart.svg?react"
import Logo from "../assets/logo.svg?react"

/**
 * Navbar component — top navigation bar with logo/brand link and cart button.
 */
export default function Navbar() {
	return (
		<nav className="navbar-main">
			{/* Brand — logo and site name, links to home */}
			<Link to="/" className="navbar-link">
				<Logo />
				<span className="navbar-title">Shoppy</span>
			</Link>

            {/* Right side actions */}
			<div className="navbar-actions">
				{/* Cart icon — navigates to cart page */}
				<Link className="cart-btn" to="/cart">
					<Cart />
				</Link>
			</div>
		</nav>
    )
}