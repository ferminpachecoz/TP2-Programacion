import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCE8Q6nV-WwD8lvOK4aAnH0Tfy-vfaC_PA",
    authDomain: "tp-integrador-2.firebaseapp.com",
    projectId: "tp-integrador-2",
    storageBucket: "tp-integrador-2.firebaseapp.com",
    messagingSenderId: "665270819281",
    appId: "1:665270819281:web:f29968f98dd2089ad268f0",
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();