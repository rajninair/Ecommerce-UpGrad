import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid2 as Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductDetails from "../products/ProductDetails";
import { useParams } from "react-router-dom";
import "./OrderSummary.css";
import AuthContext from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateOrder = () => {
  const { id, quantity } = useParams();
  const [localQuantity, setLocalQuantity] = useState(
    quantity ? parseInt(quantity, 10) : 1
  ); // Local state
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { user } = React.useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const hideBuyButton = true;
  const [activeStep, setActiveStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    contactNumber: "",
    city: "",
    landmark: "",
    street: "",
    state: "",
    zipcode: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const steps = ["Product Details", "Address Details", "Order Confirmation"];

  const handleSelectAddress = (e) => {
    const selectedAddressId = e.target.value;
    const fullAddress = addresses.find(
      (address) => address.id === selectedAddressId
    );
    setSelectedAddress(fullAddress); // Save the full address object
  };

  useEffect(() => {
    // Fetch product details using the product ID
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleNext = () => {
    if (activeStep === 1 && !selectedAddress) {
      setError("Please select an address!");
      return;
    }
    if (activeStep === 2) {
      handleConfirmOrder();
    } else {
      setError("");
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  React.useEffect(() => {
    if (activeStep === 1) {
      const fetchAddresses = async () => {
        try {
          const response = await fetch("/api/addresses", {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": user.token,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setAddresses(data);
          } else {
            throw new Error("Failed to fetch addresses.");
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchAddresses();
    }
  }, [activeStep, user.token]);

  // Handle confirming the order
  const handleConfirmOrder = async () => {
    setIsButtonDisabled(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.token,
        },
        body: JSON.stringify({
          address: selectedAddress.id,
          quantity: localQuantity,
          product: product.id,
        }),
      });
      if (response.ok) {
        console.log("SUCCESS");
        toast.success("Your order is confirmed.");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        throw new Error("Failed to place order.");
      }
    } catch (error) {
      toast.error(`${error}`, {
        toastId: "order-error",
      });
      setIsButtonDisabled(false);
    }
  };

  // Handle adding new address
  const handleAddAddress = async () => {
    try {
      const response = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.token,
        },
        body: JSON.stringify(newAddress),
      });
      if (!response.ok) throw new Error("Failed to add address.");
      // if(!response.ok) {
      //   toast.error("Failed to add address", {
      //     toastId: "add failed",
      //   });
      // }
      const savedAddress = await response.json();
      setAddresses((prevAddresses) => [...prevAddresses, savedAddress]);
      setSelectedAddress(savedAddress.id);
      toast.success("Address saved successfully");
    } catch (error) {
      toast.error(`${error}`, {
        toastId: "address-add-error",
      });
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div
            style={{
              width: "90%",
              margin: "50px auto 20px",
            }}
          >
            <ProductDetails
              product={product}
              qty={localQuantity}
              setQuantity={setLocalQuantity}
              hideBuyButton={hideBuyButton}
            />
          </div>
        );
      case 1:
        return (
          <Container maxWidth="lg">
            <FormControl
              style={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
              }}
            >
              <InputLabel>Select Address</InputLabel>
              <Select
                value={selectedAddress ? selectedAddress.id : ""}
                onChange={handleSelectAddress}
                fullWidth
                displayEmpty
              >
                {addresses.map((address) => (
                  <MenuItem key={address.id} value={address.id}>
                    {address.street}, {address.city}, {address.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div
              style={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" style={{ marginTop: "20px" }}>
                - OR -
              </Typography>

              <Typography
                variant="h6"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                Add New Address
              </Typography>
            </div>

            <Grid
              container
              justifyContent="center"
              alignItems="start"
              style={{ minHeight: "90vh" }}
            >
              <Grid item xs={12} md={6}>
                {" "}
                <Box
                  style={{ margin: "auto" }}
                  sx={{
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "white",
                    width: { xs: "100%", md: "60%" },
                  }}
                >
                  {/* Name */}
                  <TextField
                    style={{ marginBottom: "16px" }}
                    label="Name"
                    fullWidth
                    value={newAddress.name}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                  />
                  {/* Contact Number */}
                  <TextField
                    style={{ marginBottom: "16px" }}
                    label="ContactNumber"
                    fullWidth
                    value={newAddress.contactNumber}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        contactNumber: e.target.value,
                      })
                    }
                  />

                  {/* City */}
                  <TextField
                    style={{ marginBottom: "16px" }}
                    label="City"
                    fullWidth
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />

                  {/* Landmark */}
                  <TextField
                    style={{ marginBottom: "16px" }}
                    label="Landmark"
                    fullWidth
                    value={newAddress.landmark}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, landmark: e.target.value })
                    }
                  />

                  {/* Street */}
                  <TextField
                    style={{ marginBottom: "16px" }}
                    label="Street"
                    fullWidth
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                  />
                  {/* State */}
                  <TextField
                    style={{ marginBottom: "16px" }}
                    label="State"
                    fullWidth
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />

                  {/* Zipcode */}
                  <TextField
                    style={{ marginBottom: "16px" }}
                    label="ZipCode"
                    fullWidth
                    value={newAddress.zipcode}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        zipcode: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid item xs={12} style={{ marginTop: "8px" }}>
                <Button variant="contained" onClick={handleAddAddress}>
                  Save Address
                </Button>
              </Grid>
            </Grid>
          </Container>
        );
      case 2:
        return (
          <Box
            className="confirm"
            sx={{
              mt: 4,
              display: "flex",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: "background.paper",
              color: "text.secondary",
              "& svg": {
                m: 1.5,
              },
              "& hr": {
                mx: 0.5,
              },
            }}
          >
            <Grid item className="confirmOrder">
              {/* Product Details Column */}
              <Typography variant="h4" mb={1}>
                {product.name}
              </Typography>
              <Typography variant="body1" mb={1}>
                Quantity: {localQuantity}
              </Typography>
              <div className="descDetails">
                <Typography variant="subtitle1" gutterBottom>
                  Category:{" "}
                  <b>
                    {product.category.replace(/(^\w|\s\w)/g, (m) =>
                      m.toUpperCase()
                    )}
                  </b>{" "}
                </Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="h5" color="secondary">
                  Total Price : <span>&#x20B9;</span> {product.price * quantity}
                </Typography>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />

            {/* Address Details Column */}
            <Grid className="address">
              <Typography variant="h4" mb={1}>
                Address Details
              </Typography>

              {selectedAddress && (
                <>
                  <Typography variant="body1">
                    {selectedAddress.name}
                  </Typography>
                  <Typography variant="body1">
                    Contact Number: {selectedAddress.contactNumber}
                  </Typography>
                  <Typography variant="body1">
                    {selectedAddress.street}, {selectedAddress.city}
                  </Typography>
                  <Typography variant="body1">
                    {selectedAddress.state}
                  </Typography>
                  <Typography variant="body1">
                    {selectedAddress.zipcode}
                  </Typography>
                </>
              )}
            </Grid>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <ToastContainer />

      <div
        style={{
          margin: "80px auto 20px",
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div
        style={{
          margin: "20px auto 20px",
        }}
      >
        {getStepContent(activeStep)}
      </div>

      <div
        style={{
          width: "90%",
          margin: "0px auto 0px",
          textAlign: "center",
        }}
      >
        {activeStep > 0 && (
          <Button onClick={handleBack} style={{ marginRight: "10px" }}>
            Back
          </Button>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={(activeStep === 1 && !selectedAddress) || isButtonDisabled}
        >
          {activeStep === steps.length - 1 ? "Place Order" : "Next"}
        </Button>
      </div>
    </>
  );
};

export default CreateOrder;
