// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC80S9ffzwJPnt0b02wgMjUZlRWca8HcmA",
    authDomain: "workoutplan-e223b.firebaseapp.com",
    projectId: "workoutplan-e223b",
    storageBucket: "workoutplan-e223b.firebasestorage.app",
    messagingSenderId: "634998880420",
    appId: "1:634998880420:web:bbb141a4d1a077c91b8e31"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firestore instance
const db = firebase.firestore();

// Reference to your Firestore document (adjust as needed)
const workoutDocRef = db.collection("workouts").doc("userWorkout");
