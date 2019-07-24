# biotope-pwa

A generator for PWA features


## Development

To develop on @biotope/pwa you need a running https server.
We integrated one for you, but you should create and trust a certificate.
  
Just run `npm run cert`.
  
Then running the server with `npm start`.

You might notice, that your browser still says it's not save.  

For chrome you have to start your browser with  
```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --ignore-certificate-errors --ignore-urlfetcher-cert-requests &> /dev/null
```

This will set the flags to allow service workers on localhost.