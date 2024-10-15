// src/components/products/Products.js
import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
} from "@mui/material";
import Category from "../category/Category";
import Sort from "../sort/Sort";
import AuthContext from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteDialog from "../../common/DeleteDialog";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const { user } = useContext(AuthContext);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate(); // To access query params
  const location = useLocation(); // To access query params
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search");

  useEffect(() => {
    // Show toast if the message exists in the location state
    if (location.state?.message) {
      toast.success(location.state.message, { toastId: "login-success" });
    }
  }, [location.state]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.token,
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch products");
          toast.error("Could not fetch producrs", {
            toastId: "products-fetch-alert",
          });
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
        filterProducts(data, searchTerm); // Initialize with search
      } catch (err) {
        toast.error(err.toString(), { toastId: "products-alert" });

        console.error("Error fetching products:", err);
      }
    };

    console.log("User ", user);
    if (user && user.token) {
      fetchProducts();
    }
  }, [user, user.token, searchTerm]);

  const handleProductClick = (id) => {
    navigate(`/products/show/${id}`);
  };

  // Filter products based on search term
  const filterProducts = (products, term) => {
    if (term) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    console.log("Selected category: " + selectedCategory);
    if (selectedCategory === "all" || selectedCategory === null) {
      setFilteredProducts(products);
      sortProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
      sortProducts(filtered);
    }

    // const filtered = selectedCategory
    //   ? products.filter((product) => product.category === selectedCategory)
    //   : products;
    // setFilteredProducts(filtered);
    // sortProducts(filtered);
  };

  const handleSortChange = (selectedSortOption) => {
    setSortOption(selectedSortOption);
    sortProducts(filteredProducts, selectedSortOption);
  };

  const sortProducts = (productsToSort, selectedSortOption) => {
    let sortedProducts;

    switch (selectedSortOption) {
      case "priceLowToHigh":
        sortedProducts = [...productsToSort].sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sortedProducts = [...productsToSort].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sortedProducts = [...productsToSort].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        break;
      default:
        sortedProducts = productsToSort;
    }

    setFilteredProducts(sortedProducts);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.token,
        },
      });

      if (response.ok) {
        toast.success(`Product ${selectedProduct.name} deleted successfully`);
      } else {
        throw new Error("Failed to delete product");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== selectedProduct.id)
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== selectedProduct.id)
      );
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      setDeleteDialogOpen(false);
      toast.error(`${error}`, {
        toastId: "signup-error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div
      style={{
        marginTop: "2%",
        marginBottom: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ToastContainer position="top-center" />
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" marginBottom={3}>
          <Category onCategoryChange={handleCategoryChange} />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" marginBottom={5}>
          <Sort sortOption={sortOption} onSortChange={handleSortChange} />
        </Box>
      </Grid>

      {/* Products List */}
      <main
        style={{
          marginLeft: "8%",
          marginRight: "8%",
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          direction="row"
          spacing={4}
          container
          alignItems="center"
          justifyContent="center"
        >
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map((product) => (
                <Grid item key={product.id} xs={12} md={4} lg={4} sm={12}>
                  <ProductCard
                    product={product}
                    onEdit={() => navigate(`/products/edit/${product.id}`)}
                    onDelete={() => handleDeleteClick(product)}
                    handleProductClick={handleProductClick}
                  />
                </Grid>
              ))}
            </>
          ) : (
            <CircularProgress
              color="secondary"
              size="3rem"
              justifyContent="center"
            />
          )}
        </Grid>
      </main>

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onDeleteConfirm={handleDeleteConfirm}
        onDeleteCancel={handleDeleteCancel}
      />
      {/*  */}
      {/* Delete Confirmation Dialog */}
    </div>
  );
};

export default Products;
