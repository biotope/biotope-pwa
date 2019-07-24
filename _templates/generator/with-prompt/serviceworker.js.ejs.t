---
to: "<%= features.includes('Push Notifications') || features.includes('Offline Caching')  ?  workerPath + '/serviceworker.js' : null %>"
---
<% if(features.includes('Push Notifications') || features.includes('Offline Caching')) { %>
<% if(features.indexOf("Offline Caching") != -1){ %>var cacheName = '<%= name %>';

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
});<% } %>
<% if(features.indexOf("Push Notifications") != -1){ %>self.addEventListener('push', event => {
  const title = '<%= name %>';
  const options = {
    body: event.data.text(),
    image: '<%= icon %>'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  // Add your code here
  event.notification.close();
});<% } %><% } %>