// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA90sg8_g0WZpmuXt5v_8i-j_454aI0X-Q',
  authDomain: 'viewmyresults.firebaseapp.com',
  projectId: 'viewmyresults',
  storageBucket: 'viewmyresults.appspot.com',
  messagingSenderId: '632024792802',
  appId: '1:632024792802:web:3e8504e3e9d2d96e2fa8bb',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
