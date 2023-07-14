import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const isLoggedIn = () => {
      let isAuth = localStorage.getItem("isAuth");
      if (isAuth != null) return true;
      else return false;  
    };

const ProtectedRoute = () => {
  
    return isLoggedIn() ? <Outlet /> : <Navigate to="/login"/>

    // if (isLoggedIn()) {
    //     return <Outlet/>
    // } else {
    //     return <Navigate to="/login" />
    // }


    // let auth = {'token':true};

    // return (
    //     auth.token ? <Outlet/> : <Navigate to="/login"/>
    // );
}

export default ProtectedRoute;