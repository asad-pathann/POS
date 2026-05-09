import React from "react";

const SellProducts = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 font-sans text-slate-900">
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button className="text-blue-600 text-2xl">≡</button>
          <h1 className="text-2xl font-black text-[#1E3A8A]">Marketplace</h1>
        </div>
        <img
          src="https://i.pravatar.cc/100"
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          alt="profile"
        />
      </header>

      <main className="max-w-xl mx-auto p-6">
        {/* Title Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-900">Sell an Item</h2>
          <p className="text-slate-500 font-medium mt-1">
            List your product in the global marketplace.
          </p>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-6 overflow-hidden">
            <div className="bg-blue-600 h-full w-[70%] rounded-full"></div>
          </div>
        </div>

        {/* --- FORM START --- */}
        <div className="space-y-6">
          {/* Image Upload Area */}
          <div className="border-2 border-dashed border-slate-200 rounded-[2rem] bg-white p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors group">
            <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-slate-400 group-hover:scale-110 transition-transform">
              📷
            </div>
            <p className="mt-4 font-bold text-slate-500">
              Click to upload product photos
            </p>
          </div>

          {/* Product Name (Schema: name) */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 ml-1">
              Product Name
            </label>
            <input
              type="text"
              placeholder="e.g. Minimalist Ceramic Vase"
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>

          {/* Two Column Layout for Category & Barcode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category (Schema: category) */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">
                Category
              </label>
              <select className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm appearance-none">
                <option>Select Category</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home</option>
              </select>
            </div>

            {/* Barcode (Schema: barcode) */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">
                Barcode / SKU
              </label>
              <input
                type="text"
                placeholder="Scan or enter code"
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Two Column Layout for Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price (Schema: price) */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">
                Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-6 top-4 font-bold text-slate-400">
                  $
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-10 pr-6 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                />
              </div>
            </div>

            {/* Stock (Schema: stock) */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">
                Initial Stock
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 ml-1">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Describe your item's condition, features..."
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-blue-200 transition-all transform active:scale-95">
            Post Product
          </button>
        </div>
      </main>

      {/* --- BOTTOM NAVIGATION --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center z-50">
        <NavItem icon="🏠" label="Feed" />
        <NavItem icon="⊕" label="Sell" active />
        <NavItem icon="📊" label="Stats" />
        <NavItem icon="👤" label="Account" />
      </nav>
    </div>
  );
};

// Nav Item Helper
const NavItem = ({ icon, label, active }) => (
  <div
    className={`flex flex-col items-center gap-1 cursor-pointer ${active ? "text-blue-600" : "text-slate-400"}`}
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-tighter">
      {label}
    </span>
  </div>
);

export default SellProducts;
