import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInAnonymously, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

function Login({ setIsAuth }) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [authType, setAuthType] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthType(currentUser?.isAnonymous ? "anonymous" : "email");
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = userCredential.user;
      console.log(user);

      const userData = {
        email: user.email,
      };
      await addDoc(collection(db, "users"), userData);
      console.log("User document added to Firestore:", userData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      localStorage.setItem("isAuth", true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const loginAnon = async () => {
    try {
      localStorage.setItem("isAuth", true);
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    localStorage.removeItem("isAuth");
    console.log("Signed out successfully");
    await signOut(auth);
  };

    return (
        <>
            <div>
                <h3>Register User</h3>
                <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />

                <button onClick={register}>Create User</button>
            </div>

            <div>
                <h3>Login</h3>
                <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />

                <button onClick={login}>Login</button>
            </div>

            <div className="loginPage">
                <h3>Sign In With Google to Continue</h3>
                <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>

            <div className="anonymous_authentication">
                <h3>Anonymous Authentication</h3>
                <ul>
                    <li>
                        <a href="#" onClick={loginAnon}>Login Anonymously</a>
                    </li>
                </ul>
            </div>

            <div>
                <h4>User Logged In:</h4>
                {authType === "anonymous" ? "anon" : user?.email}

                <button onClick={logout}>Logout</button>
            </div>
        </>
    )
}

export default Login;
