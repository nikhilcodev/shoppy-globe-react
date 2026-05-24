import { useSelector, useDispatch } from "react-redux"
import {
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
} from "../store/cartSlice"
import { Link, useNavigate } from "react-router"
import CartItem from "../components/products/CartItem"
import toast from "react-hot-toast"

export default function Cart() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const cartItems = useSelector((state) => state.cart.items)
	const total = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	)
	if (!cartItems.length) {
		return (
			<div className="fixed inset-0 flex flex-col items-center justify-center gap-4">
				<p className="text-lg font-semibold mt-50">Your cart is empty</p>
				<Link to="/" className="text-amber-500 hover:underline">
					Continue Shopping
				</Link>
			</div>
		)
	}

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<h1 className="text-2xl font-bold text-center">Your Cart</h1>

			<div className="space-y-4">
				{cartItems.map((item) => (
					<CartItem
						key={item.id}
						item={item}
						onIncrease={() => dispatch(increaseQuantity(item.id))}
						onDecrease={() => dispatch(decreaseQuantity(item.id))}
						onRemove={() => {
							dispatch(removeFromCart(item.id))
							toast.success(`${item.title} removed from cart`)
						}}
					/>
				))}
			</div>

			<div className="flex justify-between items-center border-t pt-4">
				<p className="text-xl font-semibold">Total: 💲{total.toFixed(2)}</p>
				<button
					onClick={() => navigate("/checkout", { state: { fromCart: true } })}
					className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-4 py-2 rounded-md transition"
				>
					Checkout
				</button>
			</div>
		</div>
	)
}
