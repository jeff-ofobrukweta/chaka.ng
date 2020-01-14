importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if (workbox) {
    workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

    workbox.routing.registerRoute(
        /\.css$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: "css-files",
            plugins: [
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 5 * 24 * 60 * 60
                })
            ]
        })
    );

    workbox.routing.registerRoute(
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        new workbox.strategies.CacheFirst({
            cacheName: "image-files",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 15,
                    // Cache for a maximum of a week.
                    maxAgeSeconds: 5 * 24 * 60 * 60
                })
            ]
        })
    );

    workbox.routing.registerRoute(
        /\.js$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: "js-files",
            plugins: [
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 5 * 24 * 60 * 60
                })
            ]
        })
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
