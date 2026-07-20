// ForgeSpark Labs - Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb5vGrTXkEO_SrLh_SFRZaQV0KyqcvOAs",
  authDomain: "forgespark-labs.firebaseapp.com",
  projectId: "forgespark-labs",
  storageBucket: "forgespark-labs.firebasestorage.app",
  messagingSenderId: "1057248609457",
  appId: "1:1057248609457:web:211eadcfd7e57b475bce90",
  measurementId: "G-1VRV9RYCPP"
};

let db = null;
let analytics = null;

try {
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    
    // Initialize Analytics if SDK is loaded
    if (typeof firebase.analytics === "function") {
        analytics = firebase.analytics();
        console.log("Firebase Analytics initialized successfully.");
    }
    
    console.log("Firebase Database initialized successfully.");
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// Export for other scripts to use
window.db = db;
window.analytics = analytics;
