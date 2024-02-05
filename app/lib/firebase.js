import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCUM0z5WyBY1VesYX4WIJJpLTs9kZBIQOk",
  authDomain: "pogocodesapp.firebaseapp.com",
  projectId: "pogocodesapp",
  storageBucket: "pogocodesapp.appspot.com",
  messagingSenderId: "345714766257",
  appId: "1:345714766257:web:15fa75e0d5de6dd7b88d90",
  measurementId: "G-C87W1DVEHC",
};

// Initialize Firebase
const app = initializeApp(config);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
