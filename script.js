// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
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

// Function to save workout data to Firestore
async function saveWorkoutData(workout) {
  const user = auth.currentUser;
  if (user) {
    await setDoc(doc(db, "workouts", user.uid), { workout });
    console.log("Workout saved!");
  } else {
    console.log("User not logged in");
  }
}

// Function to load workout data and listen for real-time updates
function loadWorkoutData() {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, "workouts", user.uid);
    onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const workout = docSnap.data().workout;
        document.getElementById("workout-textarea").value = workout;
        console.log("Workout updated:", workout);
      }
    });
  }
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
    loadWorkoutData();
  } else {
    console.log("No user logged in");
  }
});

// Save button click event
document.getElementById("save-btn").addEventListener("click", () => {
  const workout = document.getElementById("workout-textarea").value;
  saveWorkoutData(workout);
});
