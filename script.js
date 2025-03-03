// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC80S9ffzwJPnt0b02wgMjUZlRWca8HcmA",
  authDomain: "workoutplan-e223b.firebaseapp.com",
  projectId: "workoutplan-e223b",
  storageBucket: "workoutplan-e223b.appspot.com",
  messagingSenderId: "634998880420",
  appId: "1:634998880420:web:bbb141a4d1a077c91b8e31",
  measurementId: "G-9QNCGEJQ2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Workout Data Structure
let workoutData = {};

// Function to Load Data from Firestore in Real-Time
function loadWorkoutData() {
    const user = auth.currentUser;
    if (user) {
        const docRef = doc(db, "workouts", user.uid);
        onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                workoutData = docSnap.data();
                renderAllDays(); // Update UI with Firestore data
            }
        });
    }
}

// Function to Save Workout Data to Firestore
async function saveWorkoutData() {
    const user = auth.currentUser;
    if (user) {
        await setDoc(doc(db, "workouts", user.uid), workoutData);
        console.log("Workout saved to Firestore!");
    } else {
        console.log("User not logged in");
    }
}

// Function to Render All Days
function renderAllDays() {
    ["monday", "tuesday", "thursday", "friday"].forEach(renderExercises);
}

// Listen for Authentication State Changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user.email);
        loadWorkoutData(); // Load workout plan from Firestore
    } else {
        console.log("No user logged in");
    }
});

// Event Listener for "Save" Button
document.getElementById("save-data").addEventListener("click", () => {
    saveWorkoutData();
});
