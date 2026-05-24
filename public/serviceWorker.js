// ============================================================
// Service Worker — Vite React App (Production Ready)
// ============================================================

const CACHE_VERSION = "v1"
const STATIC_CACHE = `static-${CACHE_VERSION}`
const PAGES_CACHE = `pages-${CACHE_VERSION}`

const OFFLINE_URL = "/offline.html"

// Files that MUST exist for offline to work
const STATIC_ASSETS = [
	"/",
	"/index.html",
	OFFLINE_URL,
	"/manifest.json",
	"/favicon.ico",
	"/favicon-16x16.png",
	"/favicon-32x32.png",
	"/icons/android-chrome-192x192.png",
	"/icons/android-chrome-512x512.png",
	"/icons/apple-touch-icon.png",
]

// ─── Install ────────────────────────────────────────────────
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(STATIC_CACHE)
			.then((cache) => cache.addAll(STATIC_ASSETS))
			.then(() => self.skipWaiting()),
	)
})

// ─── Activate ───────────────────────────────────────────────
self.addEventListener("activate", (event) => {
	const CURRENT_CACHES = [STATIC_CACHE, PAGES_CACHE]

	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) =>
				Promise.all(
					cacheNames
						.filter((name) => !CURRENT_CACHES.includes(name))
						.map((name) => caches.delete(name)),
				),
			)
			.then(() => self.clients.claim()),
	)
})

// ─── Fetch ──────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
	const { request } = event
	const url = new URL(request.url)

	// Only handle GET
	if (request.method !== "GET") return

	// Only same-origin
	if (url.origin !== self.location.origin) return

	// Ignore Vite dev stuff
	if (url.pathname.startsWith("/@")) return

	// ── Static public assets (cache-first)
	if (isStaticAsset(url.pathname)) {
		event.respondWith(cacheFirst(request, STATIC_CACHE))
		return
	}

	// ── Vite build assets (cache-first)
	if (url.pathname.startsWith("/assets/")) {
		event.respondWith(cacheFirst(request, STATIC_CACHE))
		return
	}

	// ── Navigation (SPA pages)
	if (request.mode === "navigate") {
		event.respondWith(networkFirstPage(request))
		return
	}
})

// ─── Message ────────────────────────────────────────────────
self.addEventListener("message", (event) => {
	if (event.data?.type === "SKIP_WAITING") {
		self.skipWaiting()
	}
})

// ============================================================
// Helpers
// ============================================================

function isStaticAsset(pathname) {
	return STATIC_ASSETS.includes(pathname)
}

// ─── Cache First ────────────────────────────────────────────
async function cacheFirst(request, cacheName) {
	const cache = await caches.open(cacheName)
	const cached = await cache.match(request)

	if (cached) return cached

	try {
		const networkResponse = await fetch(request)

		if (networkResponse.ok) {
			cache.put(request, networkResponse.clone())
		}

		return networkResponse
	} catch {
		return new Response("Offline", { status: 503 })
	}
}

// ─── Network First (Pages) ──────────────────────────────────
async function networkFirstPage(request) {
	const cache = await caches.open(PAGES_CACHE)

	try {
		const networkResponse = await fetch(request)

		if (networkResponse.ok) {
			cache.put(request, networkResponse.clone())
		}

		return networkResponse
	} catch {
		// Try cached page
		const cached = await cache.match(request)
		if (cached) return cached

		// Try SPA shell
		const index =
			(await caches.match("/index.html")) || (await caches.match("/"))

		if (index) return index

		// FINAL fallback (never blank)
		const offline = await caches.match(OFFLINE_URL)
		if (offline) return offline

		// Absolute last fallback
		return new Response("<h1>Offline</h1><p>No cached content available.</p>", {
			headers: { "Content-Type": "text/html" },
		})
	}
}
