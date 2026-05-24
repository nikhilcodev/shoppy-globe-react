import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../store/cartSlice"
import toast from "react-hot-toast"

/**
 * useBillGen hook — generates a bill from the current cart and handles checkout.
 * @returns {{ bill: { items: Array, total: number }, checkout: function }}
 */
export default function useBillGen() {
	const dispatch = useDispatch()
	const cartItems = useSelector((state) => state.cart.items)

	/**
	 * Builds a bill object from the current cart items.
	 * Normalizes price and quantity to numbers before calculating the total.
	 * @returns {{ items: Array, total: number }}
	 */
	const generateBill = () => {
		// Return an empty bill if the cart has no items
		if (!cartItems.length) return { items: [], total: 0 }

		try {
			// Normalize price and quantity to safe numbers
			const items = cartItems.map((item) => ({
				...item,
				price: Number(item.price) || 0,
				quantity: Number(item.quantity) || 1,
			}))

			// Sum all line totals
			const total = items.reduce(
				(acc, item) => acc + item.price * item.quantity,
				0,
			)

			return { items, total }
		} catch {
			toast.error("Failed to generate bill")
			return { items: [], total: 0 }
		}
	}

	/**
	 * Finalizes the purchase — captures the bill, clears the cart, and returns the bill data.
	 * @returns {{ items: Array, total: number } | null}
	 */
	const checkout = () => {
		// Abort if the cart is empty
		if (!cartItems.length) {
			toast.error("Cart is empty")
			return null
		}

		try {
			const billData = generateBill()
			toast.success("Purchase successful!")
			// Clear the cart only after the bill has been captured
			dispatch(clearCart())
			return billData
		} catch {
			toast.error("Checkout failed, please try again")
			return null
		}
	}

	// Expose the current bill snapshot and the checkout handler
	return { bill: generateBill(), checkout }
}
