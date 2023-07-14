import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Actors from "./pages/Actors";
import Login from "./pages/Login";
import { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import ProtectedRoute from './pages/ProtectedRoute';

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
        <Link to="/login"> Profile </Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/movies' element={<Movies/>} />
        </Route>
        
        <Route path='/Actors' element={<Actors/>} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>} />        
      </Routes>
    </Router>
  );
}

export default App;
