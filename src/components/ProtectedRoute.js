import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const ProtectedRoute = () => {
  console.log("ProtectedRoute route");
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  // For logged in users
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
