import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = () => {
  console.log("ProtectedRoute route");
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <CircularProgress color="secondary" size="3rem" justifyContent="center" />
    );
  }
  // For logged in users
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
