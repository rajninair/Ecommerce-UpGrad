import React, { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { firstName, lastName, email, contactNumber, password };

    // trying with promise

    try {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        console.log("SUCCESS");
        toast.success("Sign up successfull");
      } else {
        console.log("data ", data);
        throw new Error("There was a problem with Signup: " + data.message);
      }
    } catch (error) {
      // Show error toast on failure
      toast.error(`${error}`, {
        toastId: "signup-error",
      });
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 6 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          style={{ width: "40px", height: "40px" }}
          src="upgrad-logo.png"
          alt="login icon"
        />
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          style={{ background: "#3f51b5" }}
          fullWidth
        >
          Sign Up
        </Button>
        <br />
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link to="/signin">Already have an account? Sign In</Link>
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
            2021 upGrad
          </a>
        </Typography>
      </div>
      <ToastContainer position="top-center" />
    </Container>
  );
};

export default SignUp;
