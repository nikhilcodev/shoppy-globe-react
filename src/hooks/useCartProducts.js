import { useState, useEffect } from "react";
import axios from "axios"

const BASE_URL = "https://dummyjson.com/products"

// Debounce delay for search term changes — avoids a request on every keystroke
const DEBOUNCE_MS = 500

/**
 * useCartProducts hook — fetches a paginated and optionally searched list of products.
 * Debounces search term changes to reduce unnecessary API calls.
 * @param {number} page - Current page number (1-based).
 * @param {number} limit - Number of products per page.
 * @param {string} term - Optional search term to filter products.
 * @returns {{ products: Array, total: number, loading: boolean, error: string|null }}
 */
export default function useCartProducts(page, limit, term) {
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		// Flag to prevent state updates after unmount or dependency change
		let cancelled = false

		async function fetchProducts() {
			setLoading(true)
			setError(null)

			try {
				// Use search endpoint when a term is provided, otherwise fetch all
				const url = term
					? `${BASE_URL}/search?q=${encodeURIComponent(term)}&limit=${limit}&skip=${(page - 1) * limit}`
					: `${BASE_URL}?limit=${limit}&skip=${(page - 1) * limit}`

				const res = await axios.get(url)

				// Only update state if the request hasn't been cancelled
				if (!cancelled) {
					setProducts(res.data.products)
					setTotal(res.data.total)
				}
			} catch (err) {
				if (!cancelled) {
					if (axios.isAxiosError(err)) {
						if (err.response?.status === 404) {
							// No products matched the query
							setError("No products found")
						} else if (err.response) {
							// Server responded with a non-2xx status
							setError("Something went wrong, please try again")
						} else if (!navigator.onLine) {
							// No network connection
							setError("You are offline. Please check your connection.")
						} else {
							// Request was made but no response received
							setError("Network error, check your connection")
						}
					} else {
						// Non-Axios error (e.g. unexpected runtime error)
						setError("An unexpected error occurred")
					}
				}
			} finally {
				// Always clear loading state unless cancelled
				if (!cancelled) {
					setLoading(false)
				}
			}
		}

		// Debounce fetch when a search term is active — fire immediately otherwise
		const timer = term
			? setTimeout(fetchProducts, DEBOUNCE_MS)
			: fetchProducts()

		// Cleanup — cancel request and clear debounce timer
		return () => {
			cancelled = true
			clearTimeout(timer)
		}
	}, [page, limit, term])

	return { products, total, loading, error }
}
