import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading spinner or message
  }

  // If the user is an admin, render the child routes (Outlet), otherwise navigate to home page
  return user && user.roles.includes("ADMIN") ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default AdminRoute;
