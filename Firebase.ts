// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYnFkR0SQ1rvgk1ymxfbRk-3fJf2o5cCU",
  authDomain: "todo-51517.firebaseapp.com",
  projectId: "todo-51517",
  storageBucket: "todo-51517.appspot.com",
  messagingSenderId: "197068254163",
  appId: "1:197068254163:web:b68a9a85389ada8c40dd26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(
  app,
  "https://todo-51517-default-rtdb.europe-west1.firebasedatabase.app/"
);
