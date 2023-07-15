import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu-_sQJefl5uW-x5mkC9zFfEw2oYykcts",
  authDomain: "catalogproj-61325.firebaseapp.com",
  projectId: "catalogproj-61325",
  storageBucket: "catalogproj-61325.appspot.com",
  messagingSenderId: "610985809432",
  appId: "1:610985809432:web:d3fe7abd4ba922a2a9d56d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, db, auth, provider };
