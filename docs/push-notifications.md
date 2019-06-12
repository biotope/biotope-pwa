# Push Notifications

## When should you use it
You can combine it with the offline availability to inform the user, that a search result is available again. Or for news / events / job opportunities and other topics, that could appear frequently. 

!> Do not missuse push notification and spoil the users experience with it. There is a small line between usefull and nervewrecking!

## How to use it
To generate the service worker, as well as the registering file, run `npx @biotope/cli pwa offline` in your project, and follow the steps.
  
This will create a `pushRegister.js` and a `pushWorker.js` in the same folder. To use the generated code, just include the `pushRegister.js` in your project.  
At the end of the generation process a public and a private VAPID key will be presented to you.

> Keep these keys and store them somewhere. When you create a server to send the push notifications, you need these keys!

## Push event
In the `pushWorker.js` file you can see two event listeners. The first one will be called, as soon as the service worker receives an push event.
To customize your push notification, have a look at [the MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification) on which options are supported.

## Click event
The second one will be called, as soon as the notification which popped up, is clicked.
In there you can find a nice little comment, to tell you, where to add your code. To get a grasp of what are good patterns, have a look at the [google docs](https://developers.google.com/web/fundamentals/push-notifications/common-notification-patterns)


## Testing
You can run the service worker on your local server, as chrome allows to install service workers on `localhost` and `127.0.0.1` without https. As soon as you put it online, you need https for it to work.
  
To test the push event just click the push trigger in the chrome applications => service workers tab.
