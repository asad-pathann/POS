import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ShoppingBag,
  Search,
  Heart,
  Star,
  Plus,
  Minus,
  X,
  Sparkles,
  TrendingUp,
  Filter,
  Package,
  SlidersHorizontal,
} from "lucide-react";
import Footer from "./Footer";

// ==================== RANDOM CATEGORIES POOL ====================
const RANDOM_CATEGORIES = [
  "Skincare",
  "Lipsticks",
  "Eye Makeup",
  "Serums & Oils",
  "Sunscreens",
  "Hair Care",
  "Fragrances",
  "Face Masks",
  "Blush & Glow",
  "Tools & Brushes",
  "Cleansers",
  "Nail Care",
  "Bath & Body",
  "Anti-Aging",
  "Men's Care",
  "Gift Sets",
];

const RANDOM_BADGES = ["NEW", "HOT", "SALE", "TRENDING", "LIMITED"];

// Random helpers
const getRandomCategory = () =>
  RANDOM_CATEGORIES[Math.floor(Math.random() * RANDOM_CATEGORIES.length)];

const getRandomBadge = () =>
  RANDOM_BADGES[Math.floor(Math.random() * RANDOM_BADGES.length)];

// ==================== MAIN COMPONENT ====================
export default function ProductsPage() {
  const [storeData, setStoreData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toastMessage, setToastMessage] = useState(null);

  // ==================== FETCH PRODUCTS ====================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/api/products/get-product",
        );

        console.log("Response:", response);

        // Handle array or single object
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];

        // Enrich each product with random category + badge
        const enrichedData = data.map((product, idx) => ({
          ...product,
          id: product._id || product.id || idx + 1,
          title: product.title || product.name || `Product ${idx + 1}`,
          price: product.price || 0,
          originalPrice: product.originalPrice || product.price * 1.4 || 0,
          rating: product.rating || (Math.random() * 1 + 4).toFixed(1),
          reviews: product.reviews || Math.floor(Math.random() * 2000) + 50,
          img:
            product.img ||
            product.image ||
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80",
          category: product.category || getRandomCategory(),
          badge: getRandomBadge(),
          discount: `-${Math.floor(Math.random() * 40) + 10}%`,
        }));

        setStoreData(enrichedData);
        setFilteredProducts(enrichedData);
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==================== FILTER BY SEARCH + CATEGORY ====================
  useEffect(() => {
    let filtered = [...storeData];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, storeData]);

  // ==================== HELPERS ====================
  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showNotification(`Added "${product.title.slice(0, 25)}..." to cart!`);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const totalCartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // Unique categories from products (for filter chips)
  const uniqueCategories = [
    "All",
    ...new Set(storeData.map((p) => p.category)),
  ];

  // ==================== LOADING ====================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-bold text-slate-600">
            Loading Products...
          </span>
        </div>
      </div>
    );
  }

  // ==================== ERROR ====================
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="bg-white p-8 rounded-2xl shadow-md text-center space-y-3 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center">
            <Package className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="font-black text-slate-900">Failed to Load Products</h3>
          <p className="text-xs text-slate-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl uppercase tracking-wider"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-slate-800 antialiased">
      {/* ==================== TOAST ==================== */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-rose-600 text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-40 bg-white border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-rose-200">
              G
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-none">
                Glam<span className="text-rose-500">Mall</span>
              </span>
              <span className="text-[9px] font-bold text-rose-400 tracking-widest uppercase">
                Products
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl relative hidden sm:block">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 pl-4 pr-12 py-2.5 rounded-xl border border-transparent focus:border-rose-400 focus:bg-white focus:outline-none text-xs font-medium"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-rose-500 text-white px-4 rounded-lg">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Cart */}
          <button className="relative bg-rose-50 hover:bg-rose-100 p-2.5 rounded-xl text-rose-600 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden md:inline font-bold text-xs">Cart</span>
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ==================== MAIN ==================== */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Page Title + Count */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-rose-500" />
            <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              All Products
            </h1>
            <span className="bg-rose-100 text-rose-700 text-xs font-black px-2.5 py-1 rounded-full">
              {filteredProducts.length}
            </span>
          </div>

          {/* Mobile Search */}
          <div className="relative w-full sm:hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-4 pr-12 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
            <Search className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* ==================== CATEGORY FILTER CHIPS ==================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <SlidersHorizontal className="w-4 h-4 text-rose-500 shrink-0" />
          {uniqueCategories.slice(0, 12).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ==================== PRODUCTS GRID ==================== */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center space-y-3 border border-slate-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center">
              <Search className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="font-black text-slate-900">No Products Found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-rose-300 transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Badge */}
                <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded z-10 uppercase tracking-wider">
                  {product.badge}
                </span>

                {/* Discount */}
                <span className="absolute top-2 right-2 bg-slate-900 text-white text-[9px] font-black px-1.5 py-0.5 rounded z-10">
                  {product.discount}
                </span>

                <div>
                  {/* Image */}
                  <div className="relative aspect-square bg-slate-50 overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80";
                      }}
                    />

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute bottom-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                        wishlist.includes(product.id)
                          ? "bg-rose-500 text-white"
                          : "bg-white/80 text-slate-600 hover:text-rose-500"
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-3 space-y-1.5">
                    {/* Random Category Tag */}
                    <span className="inline-block bg-rose-100 text-rose-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {product.category}
                    </span>

                    <h3 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[11px] font-black text-slate-700">
                        {product.rating}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-sm font-black text-rose-600">
                        Rs.{Number(product.price).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through">
                        Rs.{Number(product.originalPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="p-3 pt-0">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-slate-900 hover:bg-rose-600 text-white text-xs font-extrabold py-2 rounded-xl transition-all active:scale-95 uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================== BOTTOM SECTION ==================== */}
        <section className="mt-8">
          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Trending Now
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                You May Also Like
              </h2>
              <button className="text-xs font-bold text-rose-500 hover:underline">
                View All →
              </button>
            </div>

            {/* Recommended Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 4 }).map((_, idx) => {
                const randomCat = getRandomCategory();
                const randomBadge = getRandomBadge();
                const randomPrice = Math.floor(Math.random() * 3000) + 500;
                const randomOldPrice =
                  randomPrice + Math.floor(Math.random() * 2000) + 500;

                return (
                  <div
                    key={idx}
                    className="group bg-white rounded-xl border border-slate-100 hover:border-rose-300 hover:shadow-md transition-all p-2 relative"
                  >
                    <span className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded z-10 uppercase">
                      {randomBadge}
                    </span>

                    <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 mb-2 flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-rose-300" />
                    </div>

                    <span className="inline-block bg-rose-100 text-rose-700 text-[9px] font-black px-1.5 py-0.5 rounded mb-1 uppercase tracking-wider">
                      {randomCat}
                    </span>

                    <h3 className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug mb-2 group-hover:text-rose-600 transition-colors">
                      Premium Beauty Product #{idx + 1}
                    </h3>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-rose-600">
                        Rs.{randomPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through">
                        Rs.{randomOldPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="mt-6 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 rounded-2xl p-5 text-white text-center space-y-2 shadow-md">
            <h3 className="font-black text-sm sm:text-base uppercase tracking-wider">
              🎉 Free Shipping on Orders Above Rs. 2,000
            </h3>
            <p className="text-[11px] text-rose-100 font-medium">
              7-day easy returns • 100% authentic products guaranteed
            </p>
            <button className="mt-2 bg-white text-rose-600 text-xs font-black px-6 py-2.5 rounded-xl uppercase tracking-wider hover:bg-rose-50 active:scale-95 transition-all shadow-md">
              Continue Shopping
            </button>
          </div>
        </section>
        {/* <BottomSection /> */}
      </main>

      <Footer />
    </div>
  );
}
