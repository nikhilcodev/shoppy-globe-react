import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	items: [],
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		/**
		 * Add a product to the cart.
		 * If it already exists, increment its quantity instead.
		 */
		addToCart: (state, action) => {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id,
			)

			if (existingItem) {
				existingItem.quantity += 1
			} else {
				state.items.push({ ...action.payload, quantity: 1 })
			}
		},

		/**
		 * Remove a product from the cart by ID.
		 */
		removeFromCart: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload)
		},

		/**
		 * Increment the quantity of a cart item by ID.
		 */
		increaseQuantity: (state, action) => {
			const item = state.items.find((item) => item.id === action.payload)
			if (item) item.quantity += 1
		},

		/**
		 * Decrement the quantity of a cart item by ID.
		 * Does nothing if quantity is already 1.
		 */
		decreaseQuantity: (state, action) => {
			const item = state.items.find((item) => item.id === action.payload)
			if (item && item.quantity > 1) {
				item.quantity -= 1
			}
		},

		/**
		 * Remove all items from the cart.
		 */
		clearCart: (state) => {
			state.items = []
		},
	},
})

export const {
	addToCart,
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
	clearCart,
} = cartSlice.actions

export default cartSlice.reducer
