// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOB7BcSJL0z46RG_8VET7R3axYekDBY2M",
  authDomain: "fir-auth-3f578.firebaseapp.com",
  projectId: "fir-auth-3f578",
  storageBucket: "fir-auth-3f578.appspot.com",
  messagingSenderId: "255101624190",
  appId: "1:255101624190:web:32883f32d3db47fa3d1d2f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
