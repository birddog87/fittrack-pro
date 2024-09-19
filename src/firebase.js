// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9nUldg6BWeaO8KeT2DfJmUgbLNPi1cfQ",
  authDomain: "fittrack-pro-44637.firebaseapp.com",
  projectId: "fittrack-pro-44637",
  storageBucket: "fittrack-pro-44637.appspot.com",
  messagingSenderId: "813008539537",
  appId: "1:813008539537:web:a04a29e63843339973d430"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
