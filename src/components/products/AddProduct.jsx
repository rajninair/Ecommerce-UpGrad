// src/components/products/AddProduct.js
import React from "react";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const AddProduct = () => {
  const { user } = React.useContext(AuthContext);

  const handleAddProduct = async (productData) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.token,
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("SUCCESS");
        toast.success(`Product ${productData.name} added successfully`);
      } else {
        console.log("data ", data);
        throw new Error("There was a problem adding product: " + data.message);
      }
      return data;
    } catch (error) {
      toast.error(`${error}`, {
        toastId: "add-product-error",
      });
    }
  };

  return <ProductForm onSubmit={handleAddProduct} />;
};

export default AddProduct;
