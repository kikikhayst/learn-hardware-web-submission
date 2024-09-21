const CACHE_NAME = "kikikhayst-app1-v3";
const urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/service-worker.js",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/inputDevice.html",
    "/pages/outputDevice.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/sw-register.js",
    "/assets/headphone.jpg",
    "/assets/input-device.jpg",
    "/assets/instagram.jpg",
    "/assets/keyboard.jpg",
    "/assets/lightpen.jpg",
    "/assets/monitor.jpg",
    "/assets/mouse.jpg",
    "/assets/output-device.jpg",
    "/assets/plotter.jpg",
    "/assets/printer.jpg",
    "/assets/profil.jpg",
    "/assets/profile-regular.ttf",
    "/assets/proyektor.jpg",
    "/assets/scanner.jpg",
    "/assets/speaker.jpg",
    "/assets/touchpad.jpg",
    "/assets/twitter.jpg",
    "/assets/whatsapp.jpg",
    "/assets/icon-app-512.png",
    "/assets/icon-app-192.png",
    "/assets/icon-app-192-apple.png",
    "/assets/favicon-16.png",
    "/assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});
self.addEventListener("fetch", event => {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(response => {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
