import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {

    // email-password auth

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }       
    };

    const login = async () => {
        try {
            localStorage.setItem("isAuth", true);
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    const logout = async () => {
        localStorage.removeItem("isAuth");
        await signOut(auth);
    }

    let navigate = useNavigate();

    // google auth

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        })
    }

    const logoutGoogle = async () => {
        localStorage.removeItem("isAuth");
        await signOut(auth);
    }

    // anonymous auth

    const loginAnon = async () => {
        try {
            localStorage.setItem("isAuth", true);
            const user = await signInAnonymously(auth);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    const logoutAnon = async () => {
        signOut(auth).then(() => {
                localStorage.removeItem("isAuth");
                console.log("Signed out successfully")
            }).catch((error) => {
        });
    }

    // return

    return (
        <>
        <div>
           <h3> Register User </h3>
           <input placeholder="Email..." 
            onChange={(event) => {
                setRegisterEmail(event.target.value);
           }}/>
           <input placeholder="Password..." 
           onChange={(event) => {
                setRegisterPassword(event.target.value);
           }}/>

           <button onClick={register}> Create User </button> 
        </div>

        <div>
           <h3> Login </h3>
           <input placeholder="Email..." 
           onChange={(event) => {
                setLoginEmail(event.target.value);
           }}/>
           <input placeholder="Password..."
           onChange={(event) => {
                setLoginPassword(event.target.value);
           }}/>

           <button onClick={login}> Login </button> 
        </div>

        <div>
        <h4> User Logged In: </h4>
        {user?.email}

        <button onClick={logout}> Sign Out </button>
        </div>

        <div className="loginPage">
            <h3>Sign In With Google to Continue</h3>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
            <button onClick={logoutGoogle}> Sign Out </button>
        </div>
           
        <div className="anonymous_authentication">
        <h3>Anonymous Authentication</h3>
           <ul>
                <li>
                    <a href="#" onClick={loginAnon}>Login Anonymously</a>
                </li>
                <li>
                    <a href="#" onClick={logoutAnon}>Logout</a>
                </li>
           </ul>
        </div>
        </>
    )
}

export default Login;