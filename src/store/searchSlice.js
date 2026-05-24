import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	term: "",
}

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		/**
		 * Set the active search term.
		 */
		setSearchTerm: (state, action) => {
			state.term = action.payload
		},

		/**
		 * Clear the active search term.
		 */
		clearSearchTerm: (state) => {
			state.term = ""
		},
	},
})

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions
export default searchSlice.reducer
