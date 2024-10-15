import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { CircularProgress } from "@mui/material";

const PublicRoute = () => {
  console.log("PublicRoute route");
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <CircularProgress color="secondary" size="3rem" justifyContent="center" />
    );
  }
  // For guest users
  return user ? <Navigate to="/signin" /> : <Outlet />;
};

export default PublicRoute;
