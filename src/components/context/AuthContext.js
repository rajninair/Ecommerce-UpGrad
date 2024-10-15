// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    const LOGIN_API = "/api/auth/signin";
    try {
      const response = await fetch(`${LOGIN_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Incorrect E-mail or Password.");
        } else {
          throw new Error(
            "There was a problem with the Fetch operation: " + response.status
          );
        }
      }

      const data = await response.json();
      const authToken = response.headers.get("x-auth-token");
      console.log("authToken: " + authToken);
      // Store the token inside the user object
      const userData = { ...data, token: authToken };

      // Save user with token to state and localStorage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Logged in successfully", { toastId: "login-success" });
      // Navigate to products page after successful login
      navigate("/", { state: { message: "Login successful" } });
    } catch (err) {
      toast.error(err.toString(), { toastId: "login-error" });
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove the user from localStorage
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
