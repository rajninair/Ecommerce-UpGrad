// src/pages/Login.js
import React, { useState, useContext, useEffect } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [username, setUsername] = useState("admin@demo.com");
  const [password, setPassword] = useState("password");
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is logged in, navigate to the /products page
    if (user) {
      navigate("/products");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedInUser = await login(username, password);
    if (loggedInUser) {
      navigate("/products"); // Redirect to products page on successful login
    } else {
      console.log("Login failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 6 }}>
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

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Typography variant="h6" gutterBottom style={{ fontSize: "14px" }}>
          Copyright <small>&#169;</small>{" "}
          <a
            href="https://www.upgrad.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            2021 upGrad
          </a>
        </Typography>
      </div>
    </Container>
  );
};

export default Signin;
