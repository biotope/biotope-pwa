'use strict';
self.addEventListener('push', (event) => {
  const title = '';
  const options = {
    body: event.data.text(),
    image: ''
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  // Add your code here
  event.notification.close();
});
