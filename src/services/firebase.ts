
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBkLjGqawxL12nYQYNzxdd6RvLEpvcF4sI",
  authDomain: "shopgoauth.firebaseapp.com",
  projectId: "shopgoauth",
  storageBucket: "shopgoauth.firebasestorage.app",
  messagingSenderId: "739375582621",
  appId: "1:739375582621:web:c39cc107fe53a046da3374"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)