import { lazy } from "react"

// Wrap lazy imports in a factory function so they can be retried
// after a failed load (e.g. coming back online after being offline)
const lazyWithRetry = (factory) => {
	let mod = null
	return lazy(() => {
		// Reset the cached module so it retries on next render
		if (!mod) {
			mod = factory().catch((err) => {
				mod = null // clear cache on failure so next render retries
				return Promise.reject(err)
			})
		}
		return mod
	})
}

export const ProductList = lazyWithRetry(() => import("./routes/ProductList"))
export const ProductDetails = lazyWithRetry(
	() => import("./routes/ProductDetails"),
)
export const Cart = lazyWithRetry(() => import("./routes/Cart"))
export const Checkout = lazyWithRetry(() => import("./routes/Checkout"))
