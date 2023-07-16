import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Actors from "./pages/Actors";
import Login from "./pages/Login";
import Users from "./Users";
import { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import ProtectedRoute from './pages/ProtectedRoute';
import { AppBar, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import TheatersIcon from '@mui/icons-material/Theaters';
import DrawerComp from './DrawerComp';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login";
    })
  }

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Router>
      <AppBar position='static'>
        <Toolbar>
        {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem" }}>
                Movie-Actor Catalog
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <IconButton color='inherit' href="/">
                <TheatersIcon />
              </IconButton>
                <Link to="/"> Home </Link>
                <Link to="/movies"> Movies </Link>
                <Link to="/actors"> Actors </Link>
                <Link to="/login"> Profile </Link>
                <Link to="/users"> Users </Link>
              <DrawerComp />
            </>
        )}
        </Toolbar> 
      </AppBar>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/movies' element={<Movies/>} />
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/Actors' element={<Actors/>} />
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/users' element={<Users/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
