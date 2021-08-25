import firebase from 'firebase/app';
import 'firebase/storage' ;

const CLIENT_CONFIG = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};


if (typeof window !== "undefined" && !firebase.apps.length) {
    firebase.initializeApp(CLIENT_CONFIG);
  (window as any).firebase = firebase;
}

export default firebase