---
to: <%= path %>/offline.register.js
---
const registerOfflineWorker = () => {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('<%= path %>/offlineWorker.js')
      .then( function(registration) { 
          console.log("Service Worker registered with scope:", registration.scope); 
      })
      .catch( function(error) {
          console.error('ServiceWorker registration failed: ', error);
      })
  }
}