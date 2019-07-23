---
to: <%= path %>/offline.worker.js
---
var cacheName = '<%= name %>';

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        cache.addAll([
          // add files paths here
        ]);
      })
  );
});

self.addEventListener('activate', function (event) {
  // clear cache when active
  const cacheWhitelist = ['<%= name %>'];
  event.waitUntil(
    caches.keys().then(keyList => 
      Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }))
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});