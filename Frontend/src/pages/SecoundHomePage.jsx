import React, { useEffect, useState } from "react";
import { products } from "./../Components/data";
import { FaSearch, FaFilter, FaBolt, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SecoundHomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    console.log("useEffect chal gaya");

    const handleData = async () => {
      try {
        console.log("API call ho rahi hai");

        const response = await axios.get(
          "http://localhost:8888/api/products/get-product",
        );

        console.log("Response:", response.data);

        setStoreData(response.data);
      } catch (error) {
        console.log("ERROR:", error);
      }
    };

    handleData();

    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex bg-[#eff0f5] min-h-screen w-full font-sans antialiased">
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 overflow-x-hidden">
        {/* TOP NAVBAR */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-5 bg-white p-4 shadow-sm">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Luxury <span className="text-[#f57224]">Marketplace</span>
            </h2>
            <p className="text-[11px] text-gray-400 font-medium">
              Showing results for "All Categories"
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-[380px] group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f57224] transition-colors" />
              <input
                type="text"
                placeholder="Search in Daraz..."
                className="w-full bg-[#eff0f5] border border-transparent py-2 pl-11 pr-4 rounded-sm focus:bg-white focus:border-[#f57224] outline-none transition-all text-xs font-medium"
              />
            </div>
            <button className="bg-[#eff0f5] p-2.5 text-gray-500 hover:text-[#f57224] transition-all">
              <FaFilter size={14} />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900 leading-none">
                  {user?.f_name} {user?.l_name || ""}{" "}
                  {/* ← yahan space aur safe kiya */}
                </p>
                <p className="text-[9px] text-[#f57224] font-extrabold uppercase mt-1">
                  Pro Member
                </p>
              </div>
              <img
                src="https://ui-avatars.com/api/?name=Asad&background=f57224&color=fff"
                className="w-8 h-8 rounded-full border border-gray-100 shadow-sm"
                alt="Profile"
              />
            </div>
          </div>
        </header>

        {/* PROMO BANNER */}
        <div className="hidden xl:flex bg-gradient-to-r from-orange-600 to-[#f57224] p-8 mb-6 items-center justify-between text-white shadow-sm relative overflow-hidden">
          <div className="space-y-3 relative z-10 max-w-md">
            <span className="bg-white/20 text-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest">
              6.6 Mid Year Sale
            </span>
            <h3 className="text-3xl font-black leading-tight">
              Upgrade Your Gear <br /> Up to 40% Off
            </h3>
            <button className="bg-white text-[#f57224] px-5 py-2 text-xs font-bold shadow-sm hover:bg-orange-50 transition-all">
              Shop Now
            </button>
          </div>
          <FaBolt className="text-white/5 text-[12rem] absolute -right-5 -bottom-5 rotate-12 pointer-events-none" />
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Apple-Watch-PNG-Clipart.png"
            className="w-44 drop-shadow-2xl relative z-10"
            alt="Promo"
          />
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center justify-between mb-4 overflow-x-auto no-scrollbar gap-4 bg-white p-2 shadow-sm">
          <div className="flex gap-2">
            {[
              "All Items",
              "Technology",
              "Fashion",
              "Lifestyle",
              "Office",
              "Travel",
            ].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-1.5 whitespace-nowrap text-xs transition-all ${
                  i === 0
                    ? "bg-[#f57224] text-white font-bold"
                    : "bg-white text-gray-700 hover:text-[#f57224]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="text-gray-500 text-xs flex items-center gap-1 hover:text-[#f57224] transition-colors whitespace-nowrap pr-2">
            Filter View <FaChevronDown className="-rotate-90" size={10} />
          </button>
        </div>

        {/* EXACT DARAZ STYLE PRODUCT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {storeData?.map((item) => {
            return (
              <div
                key={item._id}
                className="bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <Link to="/card-product" state={item}>
                  <div>
                    <div className="relative w-full aspect-square bg-white overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-fill group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>

                    <div className="p-2.5 pb-1">
                      <h3 className="text-xs text-gray-800">{item.name}</h3>
                    </div>
                  </div>

                  <div className="p-2.5 pt-0 mt-auto">
                    <div className="text-[#f57224] text-base font-medium">
                      Rs.{item.price}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* BOTTOM PAGINATION */}
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-1.5 bg-white border border-gray-300 px-10 py-2 text-gray-800 text-xs font-medium hover:border-[#f57224] hover:text-[#f57224] transition-all">
            Load More Products{" "}
            <FaChevronDown size={10} className="text-gray-400" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default SecoundHomePage;
