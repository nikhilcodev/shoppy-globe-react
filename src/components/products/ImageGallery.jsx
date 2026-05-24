import "./ImageGallery.css"

/**
 * ImageGallery component — displays a large selected image with a scrollable thumbnail strip.
 * @param {string[]} images - Array of image URLs to show as thumbnails.
 * @param {string} selectedImage - The currently displayed main image URL.
 * @param {function} onSelect - Callback fired when a thumbnail is clicked, receives the image URL.
 * @param {string} title - Product title used for alt text.
 */
export default function ImageGallery({
	images,
	selectedImage,
	onSelect,
	title,
}) {
	return (
		<div className="image-gallery">
			{/* Main image — updates when a thumbnail is selected */}
			<img
				src={selectedImage}
				alt={title}
				loading="lazy"
				className="image-gallery-main"
			/>

			{/* Thumbnail strip */}
			<div className="image-gallery-thumbs">
				{images?.map((img, i) => (
					<img
						key={i}
						src={img}
						loading="lazy"
						alt={`${title} view ${i + 1}`}
						onClick={() => onSelect(img)}
						/* Highlight the thumbnail that matches the selected image */
						className={`image-gallery-thumb ${selectedImage === img ? "active" : ""}`}
					/>
				))}
			</div>
		</div>
	)
}
