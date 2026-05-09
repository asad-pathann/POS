import React from "react";
import { Navbar } from "./Navbar";

// --- HERO BANNER ---
export const Hero = () => (
  <section className="my-6 relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1E293B] to-[#334155] aspect-[16/9] md:aspect-[21/9]">
    <img
      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800"
      alt="Winter Sale"
      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
    />
    <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-center text-white space-y-4">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
        Seasonal Exclusive
      </span>
      <h1 className="text-3xl md:text-5xl font-black leading-tight">
        Winter Sale - 50% Off
      </h1>
      <p className="text-sm md:text-lg text-gray-200 max-w-sm">
        Refresh your wardrobe with our premium seasonal collection.
      </p>
      <button className="bg-[#2563EB] hover:bg-blue-700 w-fit px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30">
        Shop Now
      </button>
    </div>
  </section>
);

// --- CATEGORIES ---
export const Categories = () => {
  const cats = [
    { label: "Electronics", icon: "💻", color: "bg-blue-50" },
    { label: "Fashion", icon: "👕", color: "bg-purple-50" },
    { label: "Home", icon: "🏠", color: "bg-orange-50" },
    { label: "Sports", icon: "🏋️", color: "bg-green-50" },
  ];
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Shop by Category</h2>
      <div className="grid grid-cols-4 gap-3">
        {cats.map((c) => (
          <div
            key={c.label}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div
              className={`${c.color} w-full aspect-square rounded-2xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform`}
            >
              {c.icon}
            </div>
            <span className="text-xs font-semibold text-gray-600">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- DAILY DEALS ---
export const DailyDeals = () => (
  <section className="mb-8 bg-[#E0E7FF] p-5 rounded-[2rem] border border-blue-100">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-2xl font-black text-[#1E3A8A]">Daily Deals</h2>
        <p className="text-xs text-blue-600 font-medium">Limited time offers</p>
      </div>
      <div className="flex gap-1 bg-white px-3 py-1.5 rounded-xl border border-blue-200 text-sm font-bold shadow-sm">
        <span className="text-red-500">⏰</span> 12 : 45 : 08
      </div>
    </div>
    <div className="space-y-3">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="bg-white p-3 rounded-2xl flex gap-4 items-center relative shadow-sm"
        >
          <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
            ⌚
          </div>
          <div className="flex-1">
            <span className="absolute top-2 right-2 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
              -30%
            </span>
            <h3 className="font-bold text-gray-800">Sleek Pro Watch</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-blue-600">$129.00</span>
              <span className="text-xs text-gray-400 line-through">
                $185.00
              </span>
            </div>
            <button className="text-blue-600 text-xs font-bold mt-1">
              View Deal →
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- FEATURED PRODUCTS ---
export const FeaturedProducts = () => (
  <section className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Featured Products</h2>
      <button className="text-blue-600 text-sm font-bold">See All →</button>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
      {[1, 2, 3, 4].map((p) => (
        <div
          key={p}
          className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="aspect-square bg-gray-100 rounded-xl mb-2 flex items-center justify-center text-3xl">
            📦
          </div>
          <div className="px-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Tech Accessories
            </p>
            <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
              Compact Keyboard Pro
            </h3>
            <p className="text-lg font-black text-blue-700">$145.00</p>
            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <span className="text-yellow-400">★</span> 4.8 (120 reviews)
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- BOTTOM NAVIGATION ---
export const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
    <NavItem icon="🏠" label="Home" active />
    <NavItem icon="📋" label="Feed" />
    <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl -mt-10 border-4 border-white shadow-xl shadow-blue-200">
      ＋
    </div>
    <NavItem icon="🧾" label="Orders" />
    <NavItem icon="👤" label="Profile" />
  </nav>
);

const NavItem = ({ icon, label, active }) => (
  <div
    className={`flex flex-col items-center gap-1 cursor-pointer ${active ? "text-blue-600" : "text-gray-400"}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] font-bold">{label}</span>
  </div>
);
