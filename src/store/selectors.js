import { createSelector } from "@reduxjs/toolkit"

// Base selector — returns the raw cart items array
const selectCartItems = (state) => state.cart.items

/**
 * selectCartItemIds — memoized selector that returns a Set of cart item IDs.
 * Used for O(1) lookup when checking if a product is already in the cart.
 */
export const selectCartItemIds = createSelector(
	selectCartItems,
	(items) => new Set(items.map((item) => item.id)),
)
