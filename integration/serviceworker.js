
var cacheName = '';

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
  const cacheWhitelist = [''];
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
self.addEventListener('push', event => {
  const title = '';
  const options = {
    body: event.data.text(),
    image: '/src/resources/img/icon-small.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  // Add your code here
  event.notification.close();
});