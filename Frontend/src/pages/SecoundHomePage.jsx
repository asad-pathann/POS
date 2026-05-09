import React from "react";
import { products } from "./../Components/data";
import {
  FaBars,
  FaSearch,
  FaFilter,
  FaBolt,
  FaRegHeart,
  FaShoppingCart,
  FaHome,
  FaPlusCircle,
  FaChartBar,
  FaUser,
  FaChevronDown,
  FaStore,
  FaFire,
  FaGem,
} from "react-icons/fa";
import { SideBar } from "../Components/Product_Card";
 
const SecoundHomePage = () => {
  // --- Data ---

  return (
    <div className="flex bg-[#FBFBFE] min-h-screen w-full">
      {/* 1. SIDEBAR SECTION */}
      <SideBar />
      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 px-6 lg:px-12 py-8 overflow-x-hidden">
        {/* TOP NAVBAR */}
        <header className="flex flex-col xl:flex-row justify-between items-center gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
              Luxury Marketplace
            </h2>
            <p className="text-gray-400 font-medium italic">
              Showing premium results for "All Categories"
            </p>
          </div>

          <div className="flex items-center gap-5 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-[450px] group">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-700 transition-colors" />
              <input
                type="text"
                placeholder="Search premium goods, electronics..."
                className="w-full bg-white border-2 border-transparent py-4 pl-14 pr-6 rounded-[1.5rem] shadow-md focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all text-sm font-medium"
              />
            </div>
            <button className="bg-white p-4 rounded-2xl shadow-md text-gray-500 hover:text-blue-700 transition-all border border-gray-50">
              <FaFilter size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-900">Asad Ullah</p>
                <p className="text-[10px] text-blue-600 font-bold">
                  Pro Member
                </p>
              </div>
              <img
                src="https://ui-avatars.com/api/?name=Asad&background=0D8ABC&color=fff"
                className="w-12 h-12 rounded-2xl border-2 border-white shadow-lg"
                alt="Profile"
              />
            </div>
          </div>
        </header>
        {/* PROMO BANNER (Desktop Only) */}
        <div className="hidden xl:flex bg-gradient-to-r from-blue-800 to-blue-600 rounded-[3rem] p-10 mb-12 items-center justify-between text-white shadow-2xl shadow-blue-100 relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Season Sale
            </span>
            <h3 className="text-5xl font-black">
              Upgrade Your Gear <br /> Up to 40% Off
            </h3>
            <button className="bg-white text-blue-800 px-8 py-3 rounded-2xl font-black shadow-lg hover:px-10 transition-all">
              Shop Collection
            </button>
          </div>

          <FaBolt className="text-white/10 text-[18rem] absolute -right-10 -bottom-10 rotate-12" />
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Apple-Watch-PNG-Clipart.png"
            className="w-64 drop-shadow-2xl relative z-10"
            alt="Promo"
          />
        </div>
        {/* CATEGORY TABS */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto no-scrollbar gap-4">
          <div className="flex gap-4">
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
                className={`px-8 py-3 rounded-2xl whitespace-nowrap text-sm font-black transition-all ${
                  i === 0
                    ? "bg-blue-700 text-white shadow-xl shadow-blue-200"
                    : "bg-white border border-gray-100 text-gray-400 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="text-blue-700 font-bold flex items-center gap-2 hover:gap-4 transition-all">
            Filter View <FaChevronDown className="-rotate-90" />
          </button>
        </div>
        {/* 3. PRODUCT GRID */}

       
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-50 border border-gray-100 transition-all group duration-500 hover:-translate-y-2"
              >
                {/* Product Image Area */}
                <div className="relative p-4 h-64">
                  {product.tag && (
                    <span
                      className={`absolute top-8 left-8 z-10 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-tighter ${
                        product.tag.includes("New")
                          ? "bg-blue-700 text-white"
                          : "bg-orange-500 text-white"
                      }`}
                    >
                      {product.tag}
                    </span>
                  )}
                  <button className="absolute top-8 right-8 z-10 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-all">
                    <FaRegHeart size={18} />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-[2rem] group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Product Info Area */}
                <div className="p-8 pt-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-1">
                        {product.category}
                      </p>
                      <h2 className="text-xl font-extrabold text-gray-900 truncate w-40">
                        {product.name}
                      </h2>
                    </div>
                    <p className="text-2xl font-black text-gray-900">
                      ${product.price}
                    </p>
                  </div>

                  <p className="text-gray-400 text-xs mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-700 text-white py-4 rounded-2xl text-sm font-black shadow-lg shadow-blue-100 hover:bg-blue-800 transition-colors">
                      Buy Now
                    </button>
                    <button className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-black transition-colors">
                      <FaShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      
        {/* BOTTOM PAGINATION/LOAD MORE */}
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-3 bg-white border border-gray-200 px-10 py-4 rounded-2xl text-gray-900 font-black shadow-sm hover:bg-gray-50 transition-all">
            Load More Products <FaChevronDown size={14} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default SecoundHomePage;
