// src/App.js

import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { AUTH_SUCCESS, LOGOUT } from "./redux/actions/authActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: AUTH_SUCCESS, payload: user });
      } else {
        dispatch({ type: LOGOUT });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;
