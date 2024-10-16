import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import Copyright from "../../common/copyright/Copyright";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = ({ hideBuyButton, qty }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(qty || 1);
  const [error, setError] = useState(null);
  const [quantityError, setQuantityError] = useState("");

  const navigate = useNavigate();

  // Fetch product details based on id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          width: "100%",
          minHeight: "60dvh",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          color="secondary"
          size="3rem"
          justifyContent="center"
        />
      </div>
    );
  if (error) return <div>{error}</div>;

  const handleBuyClick = () => {
    if (quantity > product.availableItems) {
      setQuantityError(
        `Entered quantity (${quantity}) exceeds available quantity (${product.availableItems}).`
      );
      return;
    }
    // Clear the error if quantity is valid
    setQuantityError("");
    navigate(`/order/${product.id}/${quantity}`);
  };

  return (
    <div className="productDetails">
      <Box sx={{ flexGrow: 0.5, mx: 16 }} className="details">
        <Grid
          container
          display="flex"
          direction="row"
          spacing={4}
          alignItems="flex-start"
        >
          {/* {" Product Image "} */}
          <Grid item xs={4} className="media">
            <img src={product.imageUrl} alt={product.name} />
          </Grid>

          {/* Product Details */}
          <Grid item sx={{ pl: 6 }} xs={8} className="description">
            {/* Title with chip */}
            <div className="title">
              <Typography variant="h4">{product.name}</Typography>
              <Chip
                label={`Available Quantity: ${product.availableItems}`}
                color="primary"
              />
            </div>

            <div className="descDetails">
              <Typography variant="subtitle1" gutterBottom>
                Categories: <b>{product.category}</b>{" "}
              </Typography>
              <Typography variant="body1" style={{ maxWidth: "400px" }}>
                {product.description}
              </Typography>
              <Typography variant="h4" color="secondary">
                <span>&#x20B9;</span> {product.price}
              </Typography>
            </div>

            {/* Form - Qty input */}
            <Box component="form" className="actions">
              <TextField
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
                type="number"
                slotProps={{
                  min: "1",
                  max: product.availableItems,
                }}
                id="outlined-basic"
                label="Enter Quantity"
                variant="outlined"
              />

              {quantityError && (
                <Typography
                  color="error"
                  variant="body2"
                  style={{ marginTop: "8px" }}
                >
                  {quantityError}
                </Typography>
              )}

              {!hideBuyButton && (
                <Button
                  size="medium"
                  className="button"
                  variant="contained"
                  color="primary"
                  sx={{ width: 150, padding: 1 }}
                  onClick={handleBuyClick}
                >
                  PLACE ORDER
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductDetails;
