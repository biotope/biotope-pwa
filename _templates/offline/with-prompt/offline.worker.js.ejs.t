---
to: <%= path %>/offline.worker.js
---
var cacheName = '<%= name %>';

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
          .then(function (cache) {
            cache.addAll([
              // ADD YOUR BUILDED FILES IN HERE
            ]);
          })
      );
});

this.addEventListener('activate', function (event) {
  // clear cache when active
  var cacheWhitelist = ['<%= name =>'];
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

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(cacheName).then( (cache) => {
            return fetch(event.request).then( function (response) {
              cache.put(event.request, response.clone());
              return response;
            });
        })
    );
});