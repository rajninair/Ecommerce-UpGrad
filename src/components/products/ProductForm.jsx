import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AuthContext from "../context/AuthContext";
import { ToastContainer } from "react-toastify";

const ProductForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    manufacturer: "",
    availableItems: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({}); // State to track validation errors
  const [categories, setCategories] = useState([]); // State for categories
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/products/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Populate form with initial data when editing
    if (isEdit && initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        price: initialData.price || "",
        description: initialData.description || "",
        imageUrl: initialData.imageUrl || "",
        manufacturer: initialData.manufacturer || "",
        availableItems: initialData.availableItems || "",
      });
    }
  }, [isEdit, initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.category.trim()) errors.category = "Category is required";
    if (!formData.price || formData.price <= 0)
      errors.price = "Price must be a positive number";
    if (!formData.imageUrl.trim()) errors.imageUrl = "Image URL is required";
    else if (!/^https?:\/\/.*\.(?:png|jpg|jpeg|svg)$/.test(formData.imageUrl))
      errors.imageUrl = "Please enter a valid image URL";
    if (!formData.description.trim())
      errors.description = "Description is required";
    if (!formData.manufacturer.trim())
      errors.manufacturer = "Manufacturer is required";
    if (!formData.availableItems || formData.availableItems <= 0)
      errors.availableItems = "Available items must be a positive number";

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) return;

    const productData = {
      ...formData,
      price: parseInt(formData.price),
      availableItems: parseInt(formData.availableItems),
    };

    try {
      await onSubmit(productData);

      if (!isEdit) {
        // Clear the form only for adding products
        setFormData({
          name: "",
          category: "",
          price: "",
          description: "",
          imageUrl: "",
          manufacturer: "",
          availableItems: "",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error ${
          isEdit ? "updating" : "adding"
        } product. Please try again.`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 3 }}>
      <ToastContainer position="top-center" />
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Edit Product" : "Add New Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControl
            fullWidth
            variant="outlined"
            error={!!formErrors.category}
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            {formErrors.category && (
              <Typography color="error" variant="caption">
                {formErrors.category}
              </Typography>
            )}
          </FormControl>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            error={!!formErrors.price}
            helperText={formErrors.price}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            name="description"
            multiline
            rows={2}
            value={formData.description}
            onChange={handleChange}
            required
            error={!!formErrors.description}
            helperText={formErrors.description}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="ImageUrl"
            variant="outlined"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            error={!!formErrors.imageUrl}
            helperText={formErrors.imageUrl}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Manufacturer"
            variant="outlined"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
            error={!!formErrors.manufacturer}
            helperText={formErrors.manufacturer}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Available Items"
            variant="outlined"
            name="availableItems"
            type="number"
            value={formData.availableItems}
            onChange={handleChange}
            required
            error={!!formErrors.availableItems}
            helperText={formErrors.availableItems}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {isEdit ? "Update Product" : "Add Product"}
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductForm;
