import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCzC3yVd6S1wCZ8weVe6fIm1nwQXo3Grg",
    authDomain: "yasirblog-2.firebaseapp.com",
    projectId: "yasirblog-2",
    storageBucket: "yasirblog-2.firebasestorage.app",
    messagingSenderId: "669694492755",
    appId: "1:669694492755:web:51764a9f33d58d608a86a6",
    measurementId: "G-68Q8YRZYF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
