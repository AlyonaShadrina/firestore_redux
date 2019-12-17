workbox.core.skipWaiting()
workbox.core.clientsClaim()

// workbox.routing.registerRoute(
//     new RegExp('.*fir-todo-8a5dc.*'),
//     workbox.strategies.networkFirst()
// )

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {

    blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
});
