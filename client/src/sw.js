import { NavigationRoute, registerRoute, Route } from 'workbox-routing';
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { CacheFirst, NetworkFirst, NetworkOnly } from "workbox-strategies";
import { BackgroundSyncPlugin } from 'workbox-background-sync';

const backendUrl = `${import.meta.env.VITE_API_URL}`;

// Ensuring that the service worker cleans up outdated caches during installation
self.addEventListener('install', (event) => {
    event.waitUntil(
        cleanupOutdatedCaches()
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        clients.claim().then(() => {
            return cleanupOutdatedCaches();
        })
    );
});

// Precacheing and routing assets
precacheAndRoute(self.__WB_MANIFEST);
self.skipWaiting();

// Caching images
const imageRoute = new Route(
    ({ request, sameOrigin }) => {
        return sameOrigin && request.destination === 'image';
    },
    new CacheFirst({
        cacheName: 'images',
    })
);
registerRoute(imageRoute);

// Registering route for caching GET requests to the backend API with NetworkFirst strategy
const fetchsRoutes = new Route(
    ({ url }) => `${url.origin}/api/v1` === backendUrl && url.pathname.startsWith('/'),
    new NetworkFirst({
        cacheName: 'api-get',
    }),
    'GET'
);
registerRoute(fetchsRoutes);

// Background synchronization
const bgSyncPlugin = new BackgroundSyncPlugin("backgroundSyncQueue", {
    maxRetentionTime: 24 * 60
});

registerRoute(
    ({ url, request }) => `${url.origin}/api/v1` === backendUrl && url.pathname.startsWith('/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    ['POST', 'PUT', 'DELETE']
);

// Caching navigation routes
const navigationRoute = new NavigationRoute(
    new NetworkFirst({
        cacheName: 'navigation',
        networkTimeoutSeconds: 3,
    })
);
registerRoute(navigationRoute);
