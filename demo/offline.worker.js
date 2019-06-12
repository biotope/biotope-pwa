var cacheName = 'name';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
          .then(function (cache) {
            cache.addAll([
              '/main.js',
              '/style.css',
              '/index.html',
              '/offline.html'
            ]);
          })
      );
});

self.addEventListener('activate', function (event) {
  // clear cache when active
  var cacheWhitelist = ['name'];
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
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
        fetch(event.request.url).catch(error => {
            // Return the offline page
            return caches.match('/offline.html');
        })
    );
  }
  else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
      })
    );
  } 
});