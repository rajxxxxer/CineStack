import { getApp, initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC3lEAZ-tSLuy2t4OTfBf37KPpl-T5hHKU",
  authDomain: "cinestack-31ad4.firebaseapp.com",
  projectId: "cinestack-31ad4",
  storageBucket: "cinestack-31ad4.appspot.com", // ✅ Fixed typo: storageBucket should be correct domain
  messagingSenderId: "14583646513",
  appId: "1:14583646513:web:ae55004cd76d582e538810",
  measurementId: "G-9ZFZFTV8P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up function
const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Save additional user data to Firestore
    await addDoc(collection(db, "users"), {   // ✅ Use "users" (standard convention)
      uid: user.uid,
      name: name,
      authProvider: "cinestack",
      email: email
    });

    console.log("User signed up successfully:", user);

  } catch (error) {
    console.error("Error signing up:", error);
    toast.error(error.code)
  }
};

// Login function

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log("User logged in successfully:", user);
  } catch (error) {
    console.error("Error logging in:", error);
    
   toast.error(error.code)
   
  }
};

// Logout function
const logout = () => {
  signOut(auth);
  console.log("User logged out");
};

// Export
export { app, auth, db, signUp, login, logout };
