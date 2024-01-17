const staticDevCoffee = "Blog App"
const assets = [
    "/",
    "/index.html",
    "/app.js",
    "/blog.html",
    "/index.css",
    "/index.js",
    "/login.html",
    "/style.css",
    "/responsive.css",
    "/serviceworker.js",
    "/assets/icon-72x72.png",
    "/assets/icon-96x96.png",
    "/assets/icon-128x128.png",
    "/assets/icon-144x144.png",
    "/assets/icon-152x152.png",
    "/assets/icon-152x152.png",
    "/assets/icon-192x192.png",
    "/assets/icon-384x384.png",
    "/assets/icon-512x512.png",
    "/images/Blog-App-Logo.png",
    "/fonts/Putrey-Bold.ttf",
    "/fonts/Putrey-Regular.ttf",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})