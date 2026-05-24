import "./Checkout.css"

import { useState } from "react"
import { useSelector } from "react-redux"
import useBillGen from "../hooks/useBillGen"

import { Link } from "react-router"

export default function Checkout() {
	const { bill, checkout } = useBillGen()
	const [completedBill, setCompletedBill] = useState(null)
	const cartItems = useSelector((state) => state.cart.items)

	const handleCheckout = () => {
		const completed = checkout()
		if (completed) {
			setCompletedBill(completed)
		}
	}

	if (!completedBill && !cartItems.length)
		return <p className="text-center mt-20 text-lg">Your cart is empty.</p>

	if (!completedBill) {
		return (
			<div className="max-w-3xl mx-auto mt-8 p-4">
				<h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>
				<table className="w-full border-collapse border shadow-sm">
					<thead>
						<tr className="bg-gray-200">
							<th className="border px-3 py-2 text-left">Product</th>
							<th className="border px-3 py-2">Quantity</th>
							<th className="border px-3 py-2">Price</th>
							<th className="border px-3 py-2">Total</th>
						</tr>
					</thead>
					<tbody>
						{bill.items.map((item) => (
							<tr key={item.id} className="text-center">
								<td className="border px-3 py-2 text-left">{item.title}</td>
								<td className="border px-3 py-2">{item.quantity}</td>
								<td className="border px-3 py-2">${item.price.toFixed(2)}</td>
								<td className="border px-3 py-2">
									${(item.price * item.quantity).toFixed(2)}
								</td>
							</tr>
						))}
						<tr className="font-semibold bg-gray-100">
							<td className="border px-3 py-2" colSpan={3}>
								Total
							</td>
							<td className="border px-3 py-2">${bill.total.toFixed(2)}</td>
						</tr>
					</tbody>
				</table>

				<div className="text-center mt-6">
					<button
						onClick={handleCheckout}
						className="bg-amber-400 hover:bg-amber-500 px-6 py-2 rounded font-semibold"
					>
						Confirm Purchase
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="max-w-3xl mx-auto mt-8 p-4 text-center">
			<h1 className="text-2xl font-bold mb-4">
				Thank you for shopping with us!
			</h1>
			<div className="bg-gray-50 p-4 rounded shadow-md text-left">
				<h2 className="text-xl font-semibold mb-2">Your Bill</h2>
				{completedBill.items.map((item) => (
					<div key={item.id} className="flex justify-between py-2">
						<span>
							{item.title} x {item.quantity}
						</span>
						<span>${(item.price * item.quantity).toFixed(2)}</span>
					</div>
				))}
				<div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
					<span>Total</span>
					<span>${completedBill.total.toFixed(2)}</span>
				</div>
			</div>
			<Link
				to="/"
				className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
			>
				Back to Home
			</Link>
		</div>
	)
}
