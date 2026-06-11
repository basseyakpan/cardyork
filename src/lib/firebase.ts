import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBogCkLlistLv348VvL0pWyj7zWlkhURGA",
  authDomain: "legitcards-3029d.firebaseapp.com",
  databaseURL: "https://legitcards-3029d-default-rtdb.firebaseio.com", // Usually projectID-default-rtdb.firebaseio.com
  projectId: "legitcards-3029d",
  storageBucket: "legitcards-3029d.firebasestorage.app",
  messagingSenderId: "209392306167",
  appId: "1:209392306167:web:d578d636a2dad2b27550f2",
  measurementId: "G-P6RLL7HGNE"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth, signInAnonymously };
