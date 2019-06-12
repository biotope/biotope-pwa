---
to: <%= path %>/offline.registration.js
---
var OfflineRegistration = function () {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('<%= path %>/offline.worker.js')
            .then( function(registration) { 
                console.log("Service Worker registered with scope:", registration.scope); 
            })
            .catch( function(error) {
                console.error('ServiceWorker registration failed: ', error);
            })
    }
}