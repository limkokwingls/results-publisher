// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDGDhocALl0PXVFnMsj1PCi4zOhvR-gifI',
  authDomain: 'viewresultsonline.firebaseapp.com',
  projectId: 'viewresultsonline',
  storageBucket: 'viewresultsonline.appspot.com',
  messagingSenderId: '577651192345',
  appId: '1:577651192345:web:abde2994e765c8ed0b7088',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
