# Offline Caching

## What is it about: 

Register and build a service worker to support offline functionalities for your web application.

## When should you use it:

It could be useful for every case of web application. So even if you are visiting a usal website it can be useful to know if the user is offline and also react on that circumstances. 

## How would you use it with @biotope/pwa:

**@biotope/pwa** generates over the command `biotope pwa` and choosing `Offline Caching` a service worker js named `serviceworker.js` file with the behaviour to cache requests and if the requests aren't responding the worker is using cached responds. Additionally you could add a predefined stack of static files to cache them. Or write your own behaviour on offline requests. 
During the generation process, you will be ask for the `project name` and the `path`, where you like to put the worker files. Beware of the scoping! 

Beside the worker, the generation process creates an `register.js` which has the default registration of the `serviceworker.js` in it.
It will be placed on the same path the worker were defined.

> Be aware that you can't handle requests outside of your scope. The scope depends on the **path** of the worker.


After the creation of the files you could fill up the array of requests that you would like to cache additonally:

```js 
...
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
          .then(function (cache) {
            cache.addAll([
                // add requests here (/styles.css, /js/main.js)
            ]);
          })
      );
});
...
```

## Offline default behaviour
if you want to have a default offline page you could add this part of code to the fetch event handler:

```js
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
        fetch(event.request.url).catch(error => {
            // Return the offline page
            return caches.match('/offline.html');
        })
    );
  }
  else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
      })
    );
  } 
});
```

> Be aware that you have to cache the offline.html on the install handler first (and all assets that are related to it). So that the worker knows about it

> we should think about updating workers

### Thanks for using PWA.