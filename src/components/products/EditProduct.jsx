// src/components/products/EditProduct.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import AuthContext from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";

const EditProduct = () => {
  const navigate = useNavigate();

  const { user } = React.useContext(AuthContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  // Fetch the product data for editing
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, user.token]);

  const handleEditProduct = async (updatedProductData) => {
    let request = fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": user.token,
      },
      body: JSON.stringify(updatedProductData),
    });
    request
      .then((data) => {
        console.log("Data... ", data.ok);
        if (data.ok) {
          console.log("SUCCESS");
          toast.success(
            `Product ${updatedProductData.name} modified successfully`
          );
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          throw new Error(
            "There was a problem with the Fetch operation: " + data.status
          );
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  if (!productData) {
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
  }

  return (
    <>
      <ProductForm
        initialData={productData}
        onSubmit={handleEditProduct}
        isEdit={true}
      />
      <ToastContainer position="top-center" />
    </>
  );
};

export default EditProduct;
