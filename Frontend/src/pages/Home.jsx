import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Fixed Imports (HERO_PROMOS ko default import rakha hai)
import HERO_PROMOS from "../Components/HomeComponent";
import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Dependency array [user, navigate] add kiya hai taaki infinite loop na bane
  useEffect(() => {
    if (user) {
      navigate("/product-card");
    }
  }, [user, navigate]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans pb-24">
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-4 md:px-6 space-y-6">
        <HERO_PROMOS />
      </main>
    </div>
  );
};

export default Home;
