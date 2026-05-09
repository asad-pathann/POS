import React from "react";

import "./globals.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Home from "./pages/Home";
import POSDashboard from "./pages/PosDishbord";
import SellProducts from "./pages/SellProducts";
import toast, { Toaster } from "react-hot-toast";
import SecoundHomePage from "./pages/SecoundHomePage";

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
          <Route path="/dishbord" element={<POSDashboard />} />
          <Route path="/product" element={<SellProducts />} />
          <Route path="/product-card" element={<SecoundHomePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default app;
