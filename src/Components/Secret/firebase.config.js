// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDQ-ZF655-w1HzkOjnUliuo-80YWDi7FPI",
    authDomain: "online-restaurent-7f07f.firebaseapp.com",
    projectId: "online-restaurent-7f07f",
    storageBucket: "online-restaurent-7f07f.appspot.com",
    messagingSenderId: "128070915983",
    appId: "1:128070915983:web:33cd5b16032801c2ad1dfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)