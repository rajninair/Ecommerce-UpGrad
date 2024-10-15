import React, { useContext, useState } from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid2,
} from "@mui/material"; // Correct import for MUI v5
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AuthContext from "../context/AuthContext";

const ProductCard = ({ product, onEdit, onDelete, handleProductClick }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Card
        className="card"
        sx={{
          width: 350,
          height: 450,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        key={product.id}
      >
        <div>
          {/* Product Image */}
          <CardMedia
            onClick={() => handleProductClick(product.id)}
            sx={{ height: 200 }}
            image={product.imageUrl}
            title={product.name}
            alt={product.name}
            key={product.id}
          />

          {/* Product Details */}
          <CardContent onClick={() => handleProductClick(product.id)}>
            <Grid2
              gap={4}
              display={"flex"}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                ${product.price}
              </Typography>
            </Grid2>
            <Typography gutterBottom variant="p" component="p" color="gray">
              {product.description}
            </Typography>
          </CardContent>
        </div>

        {/* Card footer */}

        {/* Buy Button for user */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          {user && (
            <CardActions>
              <Button
                style={{
                  background: "#3f51b5",
                  color: "white",
                  fontWeight: "bold",
                }}
                size="small"
                color="secondary"
                // onClick={() => navigate(`/order/${product.id}?${quantity}`)}
                onClick={() => handleProductClick(product.id)}
              >
                Buy
              </Button>
            </CardActions>
          )}
          {/* Edit and Delete Buttons for admin */}
          {user && user.roles.includes("ADMIN") && (
            <div style={{ marginLeft: "auto", marginTop: "auto" }}>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "3px",
                }}
              >
                <EditIcon
                  title="Edit"
                  onClick={() => onEdit(product.id)}
                  style={{ cursor: "pointer" }}
                />

                <DeleteIcon
                  title="Delete"
                  onClick={() => onDelete(product.id)}
                  style={{ cursor: "pointer" }}
                />
              </CardActions>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
