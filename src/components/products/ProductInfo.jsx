import "./ProductInfo.css"

/**
 * InfoRow — renders a single labeled metadata field.
 * @param {string} label - The field name.
 * @param {string|number} value - The field value.
 */
function InfoRow({ label, value }) {
	return (
		<p>
			<strong>{label}:</strong> {value}
		</p>
	)
}

/**
 * ProductInfo component — displays product metadata, stock status, and an add to cart button.
 * @param {object} product - The product data.
 * @param {boolean} isInCart - Whether the product is already in the cart.
 * @param {boolean} outOfStock - Whether the product is out of stock.
 * @param {function} onAddToCart - Callback fired when the button is clicked.
 */
export default function ProductInfo({
	product,
	isInCart,
	outOfStock,
	onAddToCart,
}) {
	return (
		<div className="product-info">
			{/* Product metadata rows */}
			<InfoRow label="Brand" value={product.brand} />
			<InfoRow label="Category" value={product.category} />
			<InfoRow label="SKU" value={product.sku} />
			<InfoRow label="Price" value={`$${product.price}`} />
			<InfoRow label="Discount" value={`${product.discountPercentage}%`} />
			<InfoRow label="Rating" value={`⭐ ${product.rating}`} />
			<InfoRow label="Stock" value={product.stock} />

			{/* Stock availability badge */}
			<p className={`stock-status ${outOfStock ? "out" : "in"}`}>
				{outOfStock ? "Out of Stock" : "In Stock"}
			</p>

			{/* Add to cart — disabled when out of stock or already in cart */}
			<button
				onClick={onAddToCart}
				disabled={outOfStock || isInCart}
				className={`add-to-cart-btn ${outOfStock || isInCart ? "disabled" : ""}`}
			>
				{isInCart ? "In Cart" : "Add to Cart"}
			</button>
		</div>
	)
}
