// firebase.js (corrected)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC80S9ffzwJPnt0b02wgMjUZlRWca8HcmA",
    authDomain: "workoutplan-e223b.firebaseapp.com",
    projectId: "workoutplan-e223b",
    storageBucket: "workoutplan-e223b.firebasestorage.app",
    messagingSenderId: "634998880420",
    appId: "1:634998880420:web:bbb141a4d1a077c91b8e31" // Complete and correct value
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
