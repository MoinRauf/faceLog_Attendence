// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKb556i_zgyXMVHKfOVksdJzDxBUrnA4Q",
  authDomain: "facelogg-4a8e7.firebaseapp.com",
  projectId: "facelogg-4a8e7",
  storageBucket: "facelogg-4a8e7.appspot.com",
  messagingSenderId: "484738181238",
  appId: "1:484738181238:web:84f965a4729e13ebe91757",
  measurementId: "G-MGCPNEDPND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);