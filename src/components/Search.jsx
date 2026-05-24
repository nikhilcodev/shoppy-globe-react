import "./Search.css"

import { useDispatch, useSelector } from "react-redux"
import { setSearchTerm, clearSearchTerm } from "../store/searchSlice"

/**
 * Search component — controlled input that dispatches search term updates to Redux.
 * Renders a clear button inside the input when a term is active.
 */
export default function Search() {
	const dispatch = useDispatch()
	const term = useSelector((state) => state.search.term)

	return (
		<div className="search-container">
			<input
				type="text"
				value={term}
				name="search"
				onChange={(e) => dispatch(setSearchTerm(e.target.value))}
				placeholder="Search products..."
				className="search-input"
			/>

			{/* Clear button — only visible when there is an active search term */}
			{term && (
				<button
					onClick={() => dispatch(clearSearchTerm())}
					className="clear-btn"
				>
					✕ Clear
				</button>
			)}
		</div>
	)
}
