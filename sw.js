const cacheName = 'compass'
const staticAssets = [
    './js/lib/fontawesome.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/js/all.min.js'
]

const dynamicCache = 'dynamic-cache-compass'




self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(staticAssets)
        })
    )
})


self.addEventListener('fetch', event => {
    if (staticAssets.includes(event.request.url)) // If there is static data available then don't load the data again
        event.respondWith(
            caches.match(event.request).then(cacheRes => {
                return cacheRes || fetch(event.request)
            })
        )
    else
        event.respondWith(
            // Check if there is the file available in static
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