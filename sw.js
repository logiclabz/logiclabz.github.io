importScripts('workbox-sw.prod.v1.1.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "css/main.css",
    "revision": "8170eaac3981578a0404bff3034110ad"
  },
  {
    "url": "css/normalize.css",
    "revision": "1e9c0f3b13da66012ea079bc1509fef2"
  },
  {
    "url": "favicon.ico",
    "revision": "01a64ba48ad9146a08fac0a6946b7521"
  },
  {
    "url": "img/logo.png",
    "revision": "fe239db7c0e5347aac87fa6ac8403c10"
  },
  {
    "url": "img/logo.svg",
    "revision": "777a89d70b94343eafc8ec602c05371f"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);

// The route for any requests from the googleapis origin
workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

// The route for any requests from the cloudflare origin
workboxSW.router.registerRoute('https://cdnjs.cloudflare.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'cloudflare',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);