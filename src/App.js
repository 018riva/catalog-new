import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Actors from "./pages/Actors";
import Login from "./pages/Login";
import { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login";
    })
  }

  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/movies"> Movies </Link>
        <Link to="/actors"> Actors </Link>
        {!isAuth ? <Link to="/login"> Login </Link> : <button onClick={signUserOut}>Log Out</button>}
      </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/Actors' element={<Actors/>} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>} />        
      </Routes>
    </Router>
  );
}

export default App;