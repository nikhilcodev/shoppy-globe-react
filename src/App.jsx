import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router"

import useOnlineStatus from "./hooks/useOnlineStatus"
import PageTransition from "./components/PageTransition"
import OfflinePage from "./components/OfflinePage"
import Header from "./components/Header"
import Footer from "./components/Footer"

import "./App.css"

function App() {
	const isOnline = useOnlineStatus()

	if (!isOnline) return <OfflinePage />

	return (
		<div className="main-container">
			<Header />
			<main>
				<PageTransition>
					<Outlet />
				</PageTransition>
				<Toaster position="top-right" />
			</main>
			<Footer />
		</div>
	)
}

export default App
