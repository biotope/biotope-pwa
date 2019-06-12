---
to: src/resources/manifest.json
---
class OfflineRegistration {

    constructor() {
        if('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/resources/ts/workers/offline.worker.js')
                .then((registration: RegistrationOptions): void => { 
                    console.log("Service Worker registered with scope:", registration.scope); 
                })
                .catch((error: Error): void => {
                    console.error('ServiceWorker registration failed: ', error);
                })
        }
    }

}

new OfflineRegistration();