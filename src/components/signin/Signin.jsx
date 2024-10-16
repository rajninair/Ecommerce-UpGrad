// src/pages/Login.js
import React, { useState, useContext, useEffect } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Copyright from "../../common/copyright/Copyright";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is logged in, navigate to the /products page
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedInUser = await login(username, password);
    if (loggedInUser) {
      navigate("/"); // Redirect to home/products page on successful login
    } else {
      console.log("Login failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 6, height: "80dvh" }}>
      <ToastContainer position="top-center" />
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          style={{ width: "40px", height: "40px" }}
          src="upgrad-logo.png"
          alt="login icon"
        />
        <Typography variant="h5" gutterBottom>
          Sign in
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          style={{ background: "#3f51b5" }}
          fullWidth
        >
          SIGN IN
        </Button>
        <div style={{ marginTop: "20px" }}>
          <Link to="/signup">Don't have an account? Sign Up </Link>
        </div>
      </form>

      <Copyright />
    </Container>
  );
};

export default Signin;
