import "./CartItem.css"

/**
 * CartItem component — displays a single cart entry with quantity controls and a remove button.
 * @param {object} item - The cart item (thumbnail, title, price, quantity).
 * @param {function} onIncrease - Callback to increment the item's quantity.
 * @param {function} onDecrease - Callback to decrement the item's quantity.
 * @param {function} onRemove - Callback to remove the item from the cart entirely.
 */
export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
	return (
		<div className="cart-item-container">
			{/* Left — product thumbnail and info */}
			<div className="cart-item">
				<img
					src={item.thumbnail}
					alt={item.title}
					loading="lazy"
					className="cart-item-img"
				/>
				<div>
					<p className="cart-item-title">{item.title}</p>
					<p className="cart-item-price">💲{item.price}</p>
				</div>
			</div>

			{/* Right — quantity controls and remove button */}
			<div className="cart-item-quantity-container">
				<button onClick={onDecrease} className="decrease-quantity-btn">
					-
				</button>
				<span className="quantity">{item.quantity}</span>
				<button onClick={onIncrease} className="increase-quantity-btn">
					+
				</button>
				<button onClick={onRemove} className="remove-btn">
					Remove
				</button>
			</div>
		</div>
	)
}
