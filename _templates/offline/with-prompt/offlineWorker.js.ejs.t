---
to: <%= path %>/offline.worker.js
---

var cacheName = '<%= name %>';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
          .then(function (cache) {
            cache.addAll([
                // add files paths here
            ]);
          })
      );
});

self.addEventListener('activate', function (event) {
  // clear cache when active
  var cacheWhitelist = ['<%= name %>'];
  event.waitUntil(
    caches.keys().then( function (keyList) {
      return Promise.all(keyList.map( function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
    })
  );
});