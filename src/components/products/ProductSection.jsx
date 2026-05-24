import "./ProductSection.css"

/**
 * ProductSection component — a generic labeled section wrapper.
 * @param {string} title - The section heading.
 * @param {React.ReactNode} children - Content rendered below the heading.
 */
export default function ProductSection({ title, children }) {
	return (
		<section className="product-section">
			{/* Section heading with amber left accent */}
			<h2 className="product-section-title">{title}</h2>
			{children}
		</section>
	)
}
