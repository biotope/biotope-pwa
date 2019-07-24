

const isServiceWorkerPushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window;
const isSubscribed = async () => (await swRegistration.pushManager.getSubscription()) !== null;
const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
  .replace(/\-/g, '+')
  .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}



const register = async (swPath) => {
  if (isServiceWorkerPushSupported()) {
    try {
      return await navigator.serviceWorker.register(swPath)
    } catch {
      return false;
    }
  } else {
    console.warn('Push messaging is not supported');
  }
} 
const subscribeUser = async ({registration, applicationKey}) => 
  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(applicationKey)
  })
  
const createUnsubscribeUser = (registration) => () => {
  registration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    console.log('User is unsubscribed.');
  });
}


const registerServiceWorker = async (applicationKey) => {
  const registration = await register('serviceworker.js');
  console.log('Service Worker registered with scope:', registration.scope); 
  
  const subscription = await subscribeUser({registration, applicationKey});
  return createUnsubscribeUser(registration);
  
}

// you can now use it like this:
// registerServiceWorker('BOs4nFi1Ot0l4XGBgxb19e-f1AQN_WUCFJLcvJUHxoxkrssFya18017YzWXmz-G7EnAGGjwtFjy1d-7doZPwUeg');
