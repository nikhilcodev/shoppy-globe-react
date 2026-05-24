import { useState } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../store/cartSlice"
import toast from "react-hot-toast"

import { formatDate } from "../utils/formatDate"

import { selectCartItemIds } from "../store/selectors"
import useCartProduct from "../hooks/useCartProduct"

import Spinner from "../components/Spinner"
import Error from "../components/Error"
import ImageGallery from "../components/products/ImageGallery"
import ProductInfo from "../components/products/ProductInfo"
import ProductSection from "../components/products/ProductSection"
import ReviewCard from "../components/products/ReviewCard"

import "./ProductDetails.css"

export default function ProductDetails() {
	const { id } = useParams()
	const dispatch = useDispatch()
	const cartItemIds = useSelector(selectCartItemIds)

	const { product, loading, error } = useCartProduct(id)

	const [selectedImage, setSelectedImage] = useState("")
	const [prevId, setPrevId] = useState(id)

	// Reset selected image when navigating to a different product
	if (id !== prevId) {
		setPrevId(id)
		setSelectedImage("")
	}

	// Guards first — before any render-phase state updates that depend on product
	if (loading) return <Spinner message="Loading product..." />
	if (error) return <Error message={error} />
	if (!product) return null

	// Safe here — product is guaranteed
	if (!selectedImage) {
		setSelectedImage(product.thumbnail || product.images?.[0] || "")
	}

	const isInCart = cartItemIds.has(product.id)
	const outOfStock = product.stock === 0

	const handleAddToCart = () => {
		dispatch(addToCart(product))
		toast.success(`${product.title} added to cart`)
	}

	return (
		<div className="product-details-container">
			<h1 className="product-details-title">{product.title}</h1>

			<div className="product-details-main">
				<ImageGallery
					images={product.images}
					selectedImage={selectedImage}
					onSelect={setSelectedImage}
					title={product.title}
				/>
				<ProductInfo
					product={product}
					isInCart={isInCart}
					outOfStock={outOfStock}
					onAddToCart={handleAddToCart}
				/>
			</div>

			<ProductSection title="Description">
				<p>{product.description}</p>
			</ProductSection>

			<ProductSection title="Dimensions">
				<p>Width: {product.dimensions?.width}</p>
				<p>Height: {product.dimensions?.height}</p>
				<p>Depth: {product.dimensions?.depth}</p>
			</ProductSection>

			<ProductSection title="Shipping & Warranty">
				<InfoRow label="Shipping" value={product.shippingInformation} />
				<InfoRow label="Warranty" value={product.warrantyInformation} />
				<InfoRow label="Return Policy" value={product.returnPolicy} />
			</ProductSection>

			<ProductSection title="Metadata">
				<InfoRow label="Created" value={formatDate(product.meta?.createdAt)} />
				<InfoRow label="Updated" value={formatDate(product.meta?.updatedAt)} />
				<InfoRow label="Barcode" value={product.meta?.barcode} />
				{product.meta?.qrCode && (
					<img
						src={product.meta.qrCode}
						alt="QR Code"
						className="qr-code"
						loading="lazy"
					/>
				)}
			</ProductSection>

			<ProductSection title="Reviews">
				{product.reviews?.map((review, i) => (
					<ReviewCard key={i} review={review} />
				))}
			</ProductSection>
		</div>
	)
}

function InfoRow({ label, value }) {
	return (
		<p>
			<strong>{label}:</strong> {value}
		</p>
	)
}
