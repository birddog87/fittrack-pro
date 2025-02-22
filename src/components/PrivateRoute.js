// src/components/PrivateRoute.js

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  
  return (
    <Route 
      {...rest} 
      render={(props) => 
        auth.user ? <Component {...props} /> : <Redirect to="/login" />
      } 
    />
  );
};

export default PrivateRoute;
