import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const PublicRoute = () => {
  console.log("PublicRoute route");
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Navigate to="/signin" /> : <Outlet />;
};

export default PublicRoute;
