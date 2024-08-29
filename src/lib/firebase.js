import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBfUxpVSvvpFBvA9NM9v9-XQ05yJaed7vE',
  authDomain: 'interpretationdream-bad38.firebaseapp.com',
  projectId: 'interpretationdream-bad38',
  storageBucket: 'interpretationdream-bad38.appspot.com',
  messagingSenderId: '324572853338',
  appId: '1:324572853338:web:0800bb7c5bb27801f91463',
  measurementId: 'G-8WTF6BHJ3V',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db, app };
