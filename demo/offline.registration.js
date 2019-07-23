var OfflineRegistration = function () {
    console.log('serviceWorker?','serviceWorker' in navigator )
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/offline.worker.js', {
                scope: '/'
            })
            .then( function(registration) { 
                console.log("Service Worker registered with scope:", registration.scope); 
            })
            .catch( function(error) {
                console.error('ServiceWorker registration failed: ', error);
            })
    }
}