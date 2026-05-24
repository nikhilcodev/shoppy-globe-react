import { Suspense } from "react"
import Spinner from "./components/Spinner"
import ErrorBoundary from "./components/ErrorBoundary"
import OfflinePage from "./components/OfflinePage"
import useOnlineStatus from "./hooks/useOnlineStatus"

/**
 * LazyRoute — wraps a lazily loaded route component with a Suspense spinner
 * and an ErrorBoundary. Shows <OfflinePage /> offline and retries the chunk
 * import when coming back online.
 * @param {{ component: React.ComponentType }} props
 */
// eslint-disable-next-line no-unused-vars
export default function LazyRoute({ component: Component }) {
	const isOnline = useOnlineStatus()

	// If offline, don't attempt to load the chunk — show offline page directly
	if (!isOnline) return <OfflinePage />

	return (
		// key forces full remount when coming back online,
		// which triggers a fresh lazy import attempt
		<ErrorBoundary key={String(isOnline)} fallback={<OfflinePage />}>
			<Suspense fallback={<Spinner message="Loading" />}>
				<Component key={String(isOnline)} />
			</Suspense>
		</ErrorBoundary>
	)
}
