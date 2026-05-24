import { createBrowserRouter } from "react-router"

import App from "./App"
import NotFound from "./routes/NotFound"
import LazyRoute from "./LazyRoute"

import { ProductList, ProductDetails, Cart, Checkout } from "./lazyRoutes"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <LazyRoute component={ProductList} />,
			},
			{
				path: "product/:id",
				element: <LazyRoute component={ProductDetails} />,
			},
			{
				path: "cart",
				element: <LazyRoute component={Cart} />,
			},
			{
				path: "checkout",
				element: <LazyRoute component={Checkout} />,
			},
		],
	},
])
