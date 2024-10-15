// src/components/Navbar.js
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/system";

import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Custom styling for the search input
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: "300px", // Ensure max-width is set for responsiveness
  [theme.breakpoints.up("sm")]: {
    width: "300px", // Set width for screens 'sm' and up
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo and text */}
        <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" aria-label="logo">
            <ShoppingCart />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            upGrad E-Shop
          </Typography>
        </Box>

        {/* Search */}
        <Box display={{ xs: "none", sm: "block" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearchSubmit} style={{ display: "flex" }}>
              <StyledInputBase
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </form>
          </Search>
        </Box>

        {/* Signin/Signup, Add Product (for admin) */}
        <Box display="flex" alignItems="center" gap={2}>
          {user ? (
            <>
              {user && (
                <Link to="/products" style={{ color: "white" }}>
                  Home
                </Link>
              )}

              {/* Show Add Product link only for admin */}
              {user && user.roles.includes("ADMIN") && (
                <>
                  <Link to="/add-product" style={{ color: "white" }}>
                    Add Product
                  </Link>
                </>
              )}

              <Button
                style={{ background: "red", color: "white" }}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/products" style={{ color: "white" }}>
                Home
              </Link>
              {/* <Button color="inherit" component={Link} to="/products">
                Home
              </Button> */}
              <Button color="inherit" component={Link} to="/signin">
                Signin
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
              <IconButton edge="end" color="inherit">
                <ShoppingCart />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
