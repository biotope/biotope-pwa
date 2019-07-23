---
to: <%= path %>/push.worker.js
---
'use strict';
self.addEventListener('push', event => {
  const title = '<%= title %>';
  const options = {
    body: event.data.text(),
    image: '<%= icon %>'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  // Add your code here
  event.notification.close();
});
