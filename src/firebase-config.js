import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu-_sQJefl5uW-x5mkC9zFfEw2oYykcts",
  authDomain: "catalogproj-61325.firebaseapp.com",
  projectId: "catalogproj-61325",
  storageBucket: "catalogproj-61325.appspot.com",
  messagingSenderId: "610985809432",
  appId: "1:610985809432:web:d3fe7abd4ba922a2a9d56d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();