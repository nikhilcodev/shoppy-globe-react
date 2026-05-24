import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { RouterProvider } from "react-router"
import { router } from "./router.jsx"

import { Provider } from "react-redux"
import store from "./store/store"

import "./index.css"

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
)

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/serviceWorker.js")
			.catch((err) => console.error("SW registration failed:", err))
	})
}
