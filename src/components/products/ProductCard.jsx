import "./ProductCard.css"

import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import toast from "react-hot-toast"
import { addToCart } from "../../store/cartSlice"
import { selectCartItemIds } from "../../store/selectors"

/**
 * ProductCard component — displays a product thumbnail, title, price, rating,
 * and an "Add to Cart" button that disables once the item is in the cart.
 * @param {object} product - The product to display.
 */
export default function ProductCard({ product }) {
	const dispatch = useDispatch()
	const cartItemIds = useSelector(selectCartItemIds)

	/* Check if this product is already in the cart */
	const isInCart = cartItemIds.has(product.id)

	/* Memoized handler — only recreated if dispatch or product changes */
	const handleAddToCart = useCallback(() => {
		dispatch(addToCart(product))
		toast.success(`${product.title} added to cart`)
	}, [dispatch, product])

	return (
		<div className="product-card">
			{/* Product thumbnail */}
			<img
				src={product.thumbnail}
				alt={product.title}
				className="product-image"
				loading="lazy"
			/>

			{/* Product name — links to the product detail page */}
			<h3 className="product-title">
				<Link to={`/product/${product.id}`}>{product.title}</Link>
			</h3>

			{/* Price and rating */}
			<div className="product-details">
				<p title={"Price"}>💲{product.price}</p>
				<p title={"Rating"}>⭐ {product.rating}</p>
			</div>

			{/* Add to cart — disabled and relabeled once item is in cart */}
			<button
				onClick={handleAddToCart}
				disabled={isInCart}
				className={`add-to-cart ${isInCart ? "inactive" : "active"}`}
			>
				{isInCart ? "In Cart" : "Add to Cart"}
			</button>
		</div>
	)
}
