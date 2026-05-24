import { useState, useEffect } from "react"
import axios from "axios"

/**
 * useCartProduct hook — fetches a single product by ID from the DummyJSON API.
 * Cancels the request if the component unmounts before the response arrives.
 * @param {string|number} id - The product ID to fetch.
 * @returns {{ product: object|null, loading: boolean, error: string|null }}
 */
export default function useCartProduct(id) {
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		// Skip fetch if no ID is provided
		if (!id) return

		// Flag to prevent state updates after unmount
		let cancelled = false

		// Reset state before each fetch
		setProduct(null)
		setLoading(true)
		setError(null)

		async function fetchProduct() {
			try {
				const { data } = await axios.get(`https://dummyjson.com/products/${id}`)

				// Only update state if the request hasn't been cancelled
				if (!cancelled) {
					setProduct(data)
				}
			} catch (err) {
				if (!cancelled) {
					if (axios.isAxiosError(err)) {
						if (err.response?.status === 404) {
							// Product does not exist
							setError("Product not found")
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

		fetchProduct()

		// Cleanup — mark request as cancelled on unmount or ID change
		return () => {
			cancelled = true
		}
	}, [id])

	return { product, loading, error }
}
