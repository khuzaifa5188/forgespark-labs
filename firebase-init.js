// ForgeSpark Labs - Firebase Configuration
// IMPORTANT: Replace these placeholder values with your actual Firebase project settings!
// You can find these in the Firebase Console: Project Settings -> General -> Your apps -> SDK setup and configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let db = null;

try {
    if(firebaseConfig.apiKey !== "YOUR_API_KEY") {
        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("Firebase initialized successfully.");
    } else {
        console.warn("Firebase is not configured! Please update firebase-init.js with your config.");
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// Export for other scripts to use
window.db = db;
