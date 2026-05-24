import "./ReviewCard.css"

import { formatDate } from "../../utils/formatDate"

/**
 * ReviewCard component — displays a single product review with name, stars, comment, date and email.
 * @param {object} review - The review data (reviewerName, rating, comment, date, reviewerEmail).
 */
export default function ReviewCard({ review }) {
	return (
		<div className="review-card">
			{/* Reviewer name */}
			<p className="review-name">{review.reviewerName}</p>

			{/* Star rating — one star emoji per point */}
			<p className="review-stars">{"⭐".repeat(review.rating)}</p>

			{/* Review body */}
			<p className="review-comment">{review.comment}</p>

			{/* Date and email — secondary metadata */}
			<p className="review-meta">
				{formatDate(review.date, { dateOnly: true })}
			</p>
			<p className="review-meta">{review.reviewerEmail}</p>
		</div>
	)
}
