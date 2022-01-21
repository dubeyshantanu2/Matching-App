// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGraJZo64vQ8OJMuKzdeEaPVziifn9qTg",
    authDomain: "tinder-26860.firebaseapp.com",
    projectId: "tinder-26860",
    storageBucket: "tinder-26860.appspot.com",
    messagingSenderId: "597696217487",
    appId: "1:597696217487:web:813cc00a17c37335414bfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }