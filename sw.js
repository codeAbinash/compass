const cacheName = 'compass'
const assets = [
    './index.html',
    './index.html?page=main',
    './?page=main'
]

const dynamicCache = 'dynamic-cache-compass'




self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log("Adding All caches")
            cache.addAll(assets)
        })
    )
})


self.addEventListener('fetch', event => {
    console.log("Fetch Request");
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            // Sends response from cache if available and always fetch and store to cache
            const fetchURL = fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(event.request, fetchRes.clone())
                    return fetchRes
                })
            })
            return cacheRes || fetchURL
        })
    )
})