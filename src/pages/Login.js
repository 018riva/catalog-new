import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInAnonymously, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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

  // email-password auth/register

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

  // google auth/register

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
  
        const userData = {
          email: user.email,
        };
        addDoc(collection(db, "users"), userData)
          .then(() => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
          })
          .catch((error) => {
            console.log("Error adding user to Firestore:", error);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // anon auth/register

  const loginAnon = async () => {
    try {
      localStorage.setItem("isAuth", true);
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
  
      const userData = {
        email: null,
      };
      addDoc(collection(db, "users"), userData)
        .then(() => {
          console.log("Anonymous user added to Firestore:", userData);
        })
        .catch((error) => {
          console.log("Error adding anonymous user to Firestore:", error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // logout

  const logout = async () => {
    localStorage.removeItem("isAuth");
    console.log("Signed out successfully");
    await signOut(auth);
  };

    return (
        <>
            <Box sx={{ marginTop: "20px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    You need to register and log in to view the pages
                </Typography>
            </Box>
            <Box sx={{ textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap"
                        }}>
                    <Box    sx={{  display: "block",
                            margin: "20px 40px",
                            padding: "1em 0 0 0",
                            border: "1px solid #0288d1",
                            width: "50%",
                            textAlign: "center",
                            maxWidth: "600px"
                        }}>
                        <Typography variant="h6" 
                                sx={{ display: "inline-block",
                                    position: "relative",
                                    margin: "0",
                                    padding: "5px 20px",
                                    fontSize: "20px",
                                    textAlign: "center",
                                    transform: "translateY(-30%)",
                                    textDecoration: "underline #0288d1"
                                }}>
                            Register a user with an email and a password
                        </Typography>
                    <Box sx={{ textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap"
                        }}>
                        <TextField
                            id="outlined-helperText"
                            label="Email"
                            sx={{ margin: "5px" }}
                            onChange={(event) => {
                                setRegisterEmail(event.target.value);
                            }}
                        />
                        <TextField
                            id="outlined-helperText"
                            label="Password"
                            sx={{ margin: "5px" }}
                            onChange={(event) => {
                                setRegisterPassword(event.target.value);
                            }}
                        />
                        
                    </Box>
                    <Box>
                        <Stack sx={{ textAlign: "center" }}>
                            <Button onClick={register}>Create User</Button>
                        </Stack>
                    </Box>
                </Box>

                <Box sx={{  display: "block",
                            margin: "20px 40px",
                            padding: "1em 0 0 0;",
                            border: "0",
                            border: "1px solid #0288d1",
                            width: "50%",
                            textAlign: "center",
                            maxWidth: "600px"
                        }}>
                    <Typography variant="h6" 
                            sx={{ display: "inline-block",
                                position: "relative",
                                margin: "0",
                                padding: "5px 20px",
                                fontSize: "20px",
                                textAlign: "center",
                                transform: "translateY(-30%)",
                                textDecoration: "underline #0288d1"
                            }}>
                        Log in using your email and password
                    </Typography>
                    <Box sx={{ textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap"
                        }}>
                        <TextField
                            id="outlined-helperText"
                            label="Email"
                            sx={{ margin: "5px" }}
                            onChange={(event) => {
                                setLoginEmail(event.target.value);
                            }}
                        />
                        <TextField
                            id="outlined-helperText"
                            label="Password"
                            sx={{ margin: "5px" }}
                            onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }}
                        />  
                    </Box>
                    <Box>
                        <Stack sx={{ textAlign: "center" }}>
                            <Button onClick={login}>Login</Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>  
            
            <Box sx={{ textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap"
                        }}>
                <Box    sx={{  display: "block",
                            margin: "20px 40px",
                            padding: "1em 0 0 0;",
                            border: "0",
                            border: "1px solid #0288d1",
                            width: "50%",
                            textAlign: "center",
                            maxWidth: "600px"
                        }}>
                        <Typography variant="h6" 
                                sx={{ 
                                    margin: "0",
                                    padding: "5px 20px",
                                    fontSize: "20px",
                                    textAlign: "center",
                                    transform: "translateY(-30%)",
                                    textDecoration: "underline #0288d1"
                                }}>
                                    Register and log in with Google
                        </Typography>
                        <Box>
                            <Stack sx={{ textAlign: "center" }}>
                                <Box>
                                    <Button onClick={signInWithGoogle}
                                    sx={{
                                        textAlign: "center",
                                        padding: "0px 5px 0px 40px",
                                        color: "#757575",
                                        fontSize: "25px",
                                        fontWeight: "500",
                                        backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)",
                                        backgroundColor: "white",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "5%"
                                    }}>
                                        Log in with Google
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>   
                </Box>
            </Box>


            <Box sx={{ textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap"
                        }}>
                <Box    sx={{  display: "block",
                            margin: "20px 40px",
                            padding: "1em 0 0 0;",
                            border: "0",
                            border: "1px solid #0288d1",
                            width: "50%",
                            textAlign: "center",
                            maxWidth: "600px"
                        }}>
                        <Typography variant="h6" 
                                sx={{ 
                                    margin: "0",
                                    padding: "5px 20px",
                                    fontSize: "20px",
                                    textAlign: "center",
                                    transform: "translateY(-30%)",
                                    textDecoration: "underline #0288d1"
                                }}>
                                    Register and log in as an Anonymous
                        </Typography>
                        <Box>
                            <Stack sx={{ textAlign: "center" }}>
                                <Button onClick={loginAnon}>Login</Button>
                            </Stack>
                        </Box>   
                </Box>
            </Box>

            <Box sx={{ textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }}>
                <Box sx={{  display: "block",
                            margin: "20px 40px",
                            padding: "1em 0 0 0;",
                            border: "0",
                            border: "1px solid #0288d1",
                            width: "50%",
                            textAlign: "center",
                            maxWidth: "600px"
                    }}>
                    <Typography variant="h6" 
                                sx={{ 
                                    margin: "0",
                                    padding: "5px 20px",
                                    fontSize: "20px",
                                    textAlign: "center",
                                    transform: "translateY(-30%)",
                                    textDecoration: "underline #0288d1"
                                }}>
                                    User Logged In:
                </Typography>

                {authType === "anonymous" ? "Anon" : user?.email}

                <Button onClick={logout}>Logout</Button>
                </Box>
            </Box>
        </>
    )
}

export default Login;
