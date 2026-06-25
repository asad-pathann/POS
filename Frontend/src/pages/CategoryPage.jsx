import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ShoppingBag,
  Search,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import axios from "axios";
import { Navbar } from "../Components/Navbar";

// Structured data directly mapped from your MarketData list
const structuredCategories = [
  {
    id: "staples",
    name: "Staples & Beverages",
    icon: "🌾",
    banner:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    items: [
      { name: "Atta & Flour", price: 150 },
      { name: "Rice", price: 320 },
      { name: "Pulses & Lentils", price: 280 },
      { name: "Cooking Oil & Ghee", price: 550 },
      { name: "Sugar & Sweeteners", price: 110 },
      { name: "Salt & Spices", price: 80 },
      { name: "Tea & Coffee", price: 450 },
      { name: "Beverages", price: 120 },
      { name: "Juices", price: 90 },
      { name: "Soft Drinks", price: 70 },
      { name: "Energy Drinks", price: 250 },
      { name: "Mineral Water", price: 60 },
    ],
  },
  {
    id: "snacks",
    name: "Snacks & Bakery",
    icon: "🍪",
    banner:
      "https://images.unsplash.com/photo-1550133131-05004f466f9a?w=600&q=80",
    items: [
      { name: "Biscuits & Snacks", price: 50 },
      { name: "Chocolates & Candy", price: 100 },
      { name: "Bakery", price: 180 },
      { name: "Cookies", price: 120 },
      { name: "Cakes", price: 350 },
      { name: "Namkeen", price: 60 },
      { name: "Chips", price: 50 },
      { name: "Popcorn", price: 80 },
    ],
  },
  // Aap baki categories ko bhi isi tarah { name: "...", price: 100 } format mein convert kar sakte hain.
];

export default function CategoryPage() {
  const [storeData, setStoreData] = useState([]);
  const [activeTab, setActiveTab] = useState(structuredCategories[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. ORDER LIST (CART) STATE
  const [cart, setCart] = useState([]);

  // Filter items inside the active category based on search
  const filteredItems = activeTab.items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 2. ITEM CLICK HANDLER (Add to Order List)
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check agar item pehle se cart mein hai
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name,
      );

      if (existingItem) {
        // Agar hai to quantity +1 kar do
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        // Agar naya item hai to list mein add karo
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Cart se item quantity kam karne ya remove karne ka function
  const updateQuantity = (name, amount) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) => {
            if (item.name === name) {
              const newQty = item.quantity + amount;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean), // Null items ko array se nikal dega
    );
  };

  // Total Quantity (Length) aur Total Bill calculate karna
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalBill = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(
      `Order Placed successfully! Total Items: ${totalItems}, Total Bill: PKR ${totalBill}`,
    );
    setCart([]); // Order ke baad cart clear
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/api/products/get-product",
        );

        console.log("Response:", response);
        setStoreData(response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-4 p-4 font-sans antialiased text-gray-800 grid grid-cols-12 gap-6">
        {/* LEFT / MAIN SECTION (Categories and Items) */}
        <div className="col-span-12 lg:col-span-8">
          {/* SEARCH & HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                Luxury Market Categories
              </h2>
              <p className="text-xs text-gray-500">
                Explore groceries and daily essentials
              </p>
            </div>

            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search items in this category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* TOP CAPSULES */}
          <div
            className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {storeData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat);
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap text-xs font-medium transition-all ${
                  activeTab.id === cat.id
                    ? "bg-orange-500 text-white border-orange-500 shadow-sm scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-200"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.category}</span>
              </button>
            ))}
          </div>

          {/* MAIN SPLIT DESIGN */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-12 min-h-[480px]">
            {/* Left Side: Navigation Sidebar */}
            <div className="col-span-4 bg-gray-50/70 border-r border-gray-200/60 overflow-y-auto">
              {storeData.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat);
                    setSearchQuery("");
                  }}
                  className={`w-full text-left px-4 py-3.5 text-xs md:text-sm font-medium transition-all flex items-center justify-between border-l-4 ${
                    activeTab.id === cat.id
                      ? "bg-white text-orange-600 border-orange-500 font-semibold"
                      : "text-gray-600 border-transparent hover:bg-gray-100/70"
                  }`}
                >
                  <span className="truncate">{cat.category}</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 hidden md:block ${activeTab.id === cat.id ? "text-orange-500" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>

            {/* Right Side: Items Grid */}
            <div className="col-span-8 p-4 md:p-6 overflow-y-auto flex flex-col">
              <div className="relative h-28 rounded-xl overflow-hidden mb-5 bg-gray-100">
                <img
                  src={activeTab.banner}
                  alt={activeTab.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-4">
                  <h3 className="text-white text-sm md:text-lg font-bold">
                    Everyday Essentials <br />
                    <span className="text-orange-400">{activeTab.name}</span>
                  </h3>
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Click Item to Add
                </h4>
                {filteredItems.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {storeData.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => addToCart(item)}
                        className="bg-white border border-gray-100 hover:border-orange-400 p-3 rounded-xl cursor-pointer text-center transition-all shadow-sm hover:shadow group relative"
                      >
                        <div className="w-8 h-8 bg-orange-50 rounded-lg mx-auto mb-2 flex items-center justify-center text-orange-500 font-bold group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          +
                        </div>
                        <span className="text-xs font-semibold text-gray-700 block line-clamp-1">
                          {item.name}
                        </span>
                        <span className="text-[11px] flex gap-4   text-orange-500 font-bold block mt-1">
                          PKR {item.price}
                          <span>Stock: {item?.stock}</span>{" "}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 text-xs">
                    No items found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: LIVE ORDER LIST (CART DASHBOARD) */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col h-[600px]">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-gray-900">Order List</h3>
            </div>
            <span className="bg-orange-100 text-orange-600 font-bold text-xs px-2.5 py-0.5 rounded-full">
              {totalItems} Items
            </span>
          </div>

          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100"
                >
                  <div>
                    <h5 className="text-xs font-bold text-gray-800">
                      {item.name}
                    </h5>
                    <span className="text-[11px] text-gray-400">
                      PKR {item.price} x {item.quantity}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.name, -1)}
                      className="w-6 h-6 bg-white border border-gray-200 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-gray-800 min-w-[12px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.name, 1)}
                      className="w-6 h-6 bg-white border border-gray-200 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-400 text-xs flex flex-col items-center justify-center gap-2">
                <ShoppingCart className="w-8 h-8 opacity-20" />
                Aapki order list khali hai.
              </div>
            )}
          </div>

          {/* Summary & Checkout Button */}
          <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Total Bill:</span>
              <span className="font-extrabold text-gray-900 text-base">
                PKR {totalBill}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide transition-all shadow-md ${
                cart.length > 0
                  ? "bg-orange-500 text-white hover:bg-orange-600 active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              Confirm & Place Order ({totalItems})
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
