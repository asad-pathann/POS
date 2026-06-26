import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const categories = [
    "All Products",
    "Grains & Rice",
    "Oils & Ghee",
    "Spices & Herbs",
    "Dairy Essentials",
    "Home & Cleaning",
  ];

  const products = [
    {
      id: 1,
      category: "Grains & Rice",
      title: "Premium Basmati Rice Long Grain",
      weight: "5 kg Pack",
      price: 11.5,
      originalPrice: 15.0,
      tag: "Best Seller",
      img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 2,
      category: "Oils & Ghee",
      title: "Pure Refined Vegetable Cooking Oil",
      weight: "5 Litre Can",
      price: 18.0,
      originalPrice: 22.5,
      tag: "10% OFF",
      img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 3,
      category: "Spices & Herbs",
      title: "Organic Ground Hot Chili Spice",
      weight: "250g Pack",
      price: 2.99,
      originalPrice: 4.5,
      tag: "Fresh Stock",
      img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 4,
      category: "Dairy Essentials",
      title: "Pure Desi Ghee Farm Fresh",
      weight: "1 kg Tin",
      price: 9.2,
      originalPrice: 11.0,
      tag: "Organic",
      img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 5,
      category: "Grains & Rice",
      title: "Premium Split Chickpea (Chana Dal)",
      weight: "1 kg Pack",
      price: 2.1,
      originalPrice: 2.8,
      tag: "Wholesale",
      img: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 6,
      category: "Home & Cleaning",
      title: "Active Dishwash Lemon Fresh Soap",
      weight: "3-in-1 Value Pack",
      price: 0.8,
      originalPrice: 1.2,
      tag: "Bulk Deal",
      img: "https://images.unsplash.com/photo-1585060544812-6b4590345ddc?w=400&auto=format&fit=crop&q=70",
    },
  ];

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-6 pb-24 px-4 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8 border-b  border-slate-100 pb-5">
        <div className="flex items-center gap-4 ">
          <FaArrowLeft onClick={() => navigate(-1)} />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Supermarket Catalog
          </h1>
        </div>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Premium daily staples at authentic wholesale pricing.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Category Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm sticky top-6">
            <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3 px-1">
              Filter Categories
            </h2>
            <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-4 py-2.5 rounded-xl whitespace-nowrap transition-all text-left w-full ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/10"
                      : "bg-transparent text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Side: Product Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-500/20 hover:shadow-md transition-all duration-300 group"
              >
                {/* Image Section */}
                <div className="relative aspect-square w-full bg-slate-50 p-2">
                  <span className="absolute top-2.5 left-2.5 bg-slate-900 text-white text-[8px] font-black px-2 py-0.5 rounded-md z-10 tracking-wider uppercase">
                    {product.tag}
                  </span>
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                {/* Info Section */}
                <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-black uppercase tracking-wider text-emerald-600 block">
                      {product.category}
                    </span>
                    <h3 className="text-xs font-black text-slate-800 line-clamp-1 leading-snug tracking-tight">
                      {product.title}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 block">
                      {product.weight}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through font-medium">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button className="w-full bg-slate-900 hover:bg-emerald-600 text-white text-[11px] font-bold py-2.5 rounded-xl transition-all active:scale-95">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
              <span className="text-2xl">📦</span>
              <p className="text-xs font-bold text-slate-400 mt-2">
                No products found in this category.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
