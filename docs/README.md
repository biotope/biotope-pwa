# biotope-pwa
A generator for PWA features

## Manifest
To add a manifest just use our generator `npx @biotope/cli pwa manifest` or any generic [manifest generator on the web](https://app-manifest.firebaseapp.com/)

This will allow your app to have metadata, like product colors, product name and icons. In addition if you meet some requirements in there, your product will be installable on the home screen.

See [app manifest](manifest.md) for further documentation. 


## Offline Service Worker
If your app should cache resources and be able to work offline, you should add a caching service worker to your project.
You can easily do this be running `npx @biotope/cli pwa offline`.

For configuration see [service worker](offline-service-worker.md)
