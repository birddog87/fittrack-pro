// src/pages/Register.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";
import { TextField, Button, Container, Typography } from "@mui/material";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Add more fields as needed (e.g., name)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(email, password, { /* additionalData */ }));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
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
        {/* Add more input fields as needed */}
        <Button type="submit" variant="contained" color="primary" disabled={auth.loading}>
          {auth.loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Container>
  );
};

export default Register;
