// src/pages/Login.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { TextField, Button, Container, Typography } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      {auth.error && <Typography color="error">{auth.error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Email" 
          fullWidth 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <Button type="submit" variant="contained" color="primary" disabled={auth.loading}>
          {auth.loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
