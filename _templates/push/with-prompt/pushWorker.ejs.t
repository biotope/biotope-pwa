---
to: <%= path %>/pushWorker.js
---
'use strict';
self.addEventListener('push', (event) => {
  const title = '<%= title %>';
  const options = {
    body: event.data.text(),
    image: '<%= icon %>'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  // Add your code here
  event.notification.close();
});
