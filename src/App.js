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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>

          <Route element={<AdminRoute />}></Route>
          <Route element={<PublicRoute />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
