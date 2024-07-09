// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAt1F3a-2mjJK-qTbEfOUrKUqIvH-xDV4Y',
  authDomain: 'luctresults.firebaseapp.com',
  projectId: 'luctresults',
  storageBucket: 'luctresults.appspot.com',
  messagingSenderId: '97237011243',
  appId: '1:97237011243:web:9f4c65fff43ee889de936e',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
