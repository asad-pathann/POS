import React from "react";

import "./globals.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import Otp from "./pages/Otp";
import Home from "./pages/Home";
import SellProducts from "./pages/SellProducts";
import toast, { Toaster } from "react-hot-toast";
import SecoundHomePage from "./pages/SecoundHomePage";
import Dashbord from "./pages/Dashbord";
import ProductCard from "./pages/ProductCard";
import OrderSection from "./pages/OrderSection";
import GetOrder from "./Components/produts/orders/GetOrder";
import CategoryPage from "./pages/CategoryPage";
import Otp from "./pages/Otp";

const app = () => {
  return (
    <>
      <Router>
        <Toaster />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route path="/otp" element={<Otp />} />

          <Route path="/product" element={<SellProducts />} />

          <Route path="/product-card" element={<SecoundHomePage />} />

          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/card-product" element={<ProductCard />} />
          <Route path="/order-card" element={<OrderSection />} />
          <Route path="/get-order" element={<GetOrder />} />
          <Route path="/category" element={<CategoryPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default app;
