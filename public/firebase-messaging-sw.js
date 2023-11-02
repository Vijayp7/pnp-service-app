importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");


firebase.initializeApp({
    apiKey: "AIzaSyDbeC3JR7EiCjyyE-lGhMJ_nEyQngLaaBg",
    authDomain: "pnp-web-9d11c.firebaseapp.com",
    projectId: "pnp-web-9d11c",
    storageBucket: "pnp-web-9d11c.appspot.com",
    messagingSenderId: "724843039501",
    appId: "1:724843039501:web:537ba6dd1bdd6865d6fe44",
    measurementId: "G-Z96WNGKRQJ"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload){
    console.log("received background msg", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body : payload.notification.body,
    };
    self.ServiceWorkerRegistration.showNotification(notificationTitle,notificationOptions);
});