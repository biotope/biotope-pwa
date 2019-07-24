

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