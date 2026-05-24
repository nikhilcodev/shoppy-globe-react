import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import searchReducer from "./searchSlice"

/**Redux store - combines search and slices */

export default configureStore ({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
    },
})
