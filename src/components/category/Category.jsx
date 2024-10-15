// src/components/Category.js
import React, { useContext, useEffect, useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import AuthContext from "../context/AuthContext";

const Category = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user } = useContext(AuthContext);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/products/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.token,
          },
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [user.token]);

  // Handle category change
  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    onCategoryChange(newValue); // Call the parent function to change the category
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={selectedCategory}
        onChange={handleCategoryChange}
        variant="scrollable"
        scrollButtons="auto"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ToggleButton value="all">ALL</ToggleButton>
        {categories.map((category, index) => (
          <ToggleButton key={index} value={category}>
            {category.toUpperCase()}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

export default Category;
