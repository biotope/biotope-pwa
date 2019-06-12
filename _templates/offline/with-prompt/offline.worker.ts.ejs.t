---
to: <%= path %>/offline.worker.ts
---

interface ExtendableEvent extends Event {
    waitUntil(fn: Promise<any>): void;
}

interface FetchEvent extends Event {
    respondWith(fn: Promise<any>): void;
    request: Request
}

const cacheName: string = '<%= name %>';

this.addEventListener('install', (event: ExtendableEvent): void => {
    event.waitUntil(
        caches.open(cacheName)
          .then((cache: Cache): void => {
            cache.addAll([
              // ADD YOUR BUILDED FILES IN HERE
            ]);
          })
      );
});

this.addEventListener('activate', (event: ExtendableEvent) {
  // clear cache when active
  var cacheWhitelist: string[] = ['<%= name =>'];
  event.waitUntil(
    caches.keys().then( (keyList: string[]) => {
      return Promise.all( keyList.map( (key) => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

this.addEventListener('fetch', (event: any): void => {
    event.respondWith(
        caches.open(cacheName).then( (cache) => {
            return fetch(event.request).then( (response) => {
              cache.put(event.request, response.clone());
              return response;
            });
        })
    );
});