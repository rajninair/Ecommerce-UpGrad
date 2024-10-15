import logo from "./logo.svg";
import "./App.css";
import { AuthProvider } from "./components/context/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Products from "./components/products/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/navbar/Navbar";
import AddProduct from "./components/products/AddProduct";
import ProductDetails from "./components/products/ProductDetails";
import CreateOrder from "./components/order/CreateOrder";
import EditProduct from "./components/products/EditProduct";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route element={<PublicRoute />}></Route>

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes - for logged in users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path={`/products/show/:id`} element={<ProductDetails />} />
            <Route path={`/order/:id/:quantity?`} element={<CreateOrder />} />
            <Route
              path={`/products/edit/:productId`}
              element={<EditProduct />}
            />
          </Route>

          {/*  Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
