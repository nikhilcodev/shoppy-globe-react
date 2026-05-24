import { Link } from "react-router"

import "./Bill.css"

/**
 * Bill component — displays a summary of the completed order with a back button.
 * @param {{ items: Array, total: number }} bill - The completed bill data.
 */
export default function Bill({ bill }) {
	return (
		<div className="bill-container">
			<h1 className="bill-head-text">Thank you for shopping with us!</h1>

			{/* Itemized bill card */}
			<div className="bill-main">
				<h2 className="bill-text">Your Bill</h2>

				{/* One row per cart item */}
				{bill.items.map((item) => (
					<div key={item.id} className="bill-items">
						<span>
							{item.title} x {item.quantity}
						</span>
						<span>${(item.price * item.quantity).toFixed(2)}</span>
					</div>
				))}

				{/* Grand total row */}
				<div className="total-container">
					<span>Total</span>
					<span>${bill.total.toFixed(2)}</span>
				</div>
			</div>

			{/* Navigate back to the product listing */}
			<Link to="/" className="back-btn">
				Back to Home
			</Link>
		</div>
	)
}
