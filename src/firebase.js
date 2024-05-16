import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAkscBtjK19vCSEimh70DaxfvtEc-7wfkw",
  authDomain: "bubble-tea-app-87fc3.firebaseapp.com",
  projectId: "bubble-tea-app-87fc3",
  storageBucket: "bubble-tea-app-87fc3.appspot.com",
  messagingSenderId: "979715028131",
  appId: "1:979715028131:web:a7d7469b1f355984977b16"
};


initializeApp(firebaseConfig);
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)