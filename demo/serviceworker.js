var cacheName = 'Pushme';

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
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
  const cacheWhitelist = [cacheName];
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
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
        fetch(event.request.url).catch(error => {
            // Return the offline page
            return caches.match('/offline.html');
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    )
  }
});
self.addEventListener('push', event => {
  const title = 'Push ME';
  const options = {
    body: event.data.text(),
    image: ''
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  // Add your code here
  event.notification.close();
});