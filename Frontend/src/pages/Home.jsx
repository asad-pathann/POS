import React, { useEffect } from "react";

// Sub-Components (Neeche define kiye gaye hain)
import {
  Hero,
  Categories,
  DailyDeals,
  FeaturedProducts,
  BottomNav,
} from "./../Components/HomeComponent";
import { Navbar } from "../Components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/product-card");
    }
  });
  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans pb-24">
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 md:px-6">
        <Hero />

        <Categories />
        <DailyDeals />
        <FeaturedProducts />
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
