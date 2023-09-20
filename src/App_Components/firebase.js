// Import the functions you need from the SDKs you need
import { initializeApp } from "/node_modules/firebase/app";
import { getAuth } from "/node_modules/firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATrEpAiX-UnNg4wTugDiPNJwqWMHzsnOg",
  authDomain: "drag-drop-image-gallery.firebaseapp.com",
  projectId: "drag-drop-image-gallery",
  storageBucket: "drag-drop-image-gallery.appspot.com",
  messagingSenderId: "303556606223",
  appId: "1:303556606223:web:e12fdf8a373a6f0e9c267a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
