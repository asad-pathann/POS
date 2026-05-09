import React from "react";

const POSDashboard = () => {
  // Mock data aapke schema ke mutabiq
  const stats = [
    {
      label: "Total Sales",
      value: "1,240",
      icon: "📈",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Revenue",
      value: "$24,500",
      icon: "💰",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Stock",
      value: "450",
      icon: "📦",
      color: "text-purple-600",
      bg: "bg-purple-50",
    }, // 'stock' field
    {
      label: "Profit",
      value: "$8,200",
      icon: "✨",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Tax",
      value: "$420",
      icon: "🏛️",
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
    {
      label: "Categories",
      value: "8",
      icon: "📂",
      color: "text-rose-600",
      bg: "bg-rose-50",
    }, // 'category' field
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 font-sans text-slate-900">
      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <span className="text-xl font-black text-blue-900 tracking-tight">
            Inventory POS
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-slate-400">ADMIN PANEL</p>
            <p className="text-sm font-black text-slate-700">Alex's Store</p>
          </div>
          <img
            src="https://i.pravatar.cc/100"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            alt="avatar"
          />
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto p-4 md:p-8">
        {/* --- TOP ACTIONS & SCANNER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 font-medium italic">
              Tracking your Product Schema data
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              <span>➕</span> Add Product
            </button>
            <button className="flex-1 md:flex-none bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition">
              <span>📷</span> Scan Barcode
            </button>
          </div>
        </div>

        {/* --- SCHEMA STATS GRID --- */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition"
            >
              <div
                className={`${s.bg} ${s.color} w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4`}
              >
                {s.icon}
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {s.label}
              </p>
              <h3 className={`text-2xl font-black mt-1 ${s.color}`}>
                {s.value}
              </h3>
            </div>
          ))}
        </div>

        {/* --- INVENTORY LIST (Based on Product Schema) --- */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xl font-black">Live Inventory</h2>
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold">
              Active Products
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] font-black uppercase tracking-widest bg-white">
                  <th className="p-6">Product & Category</th>
                  <th className="p-6">Barcode</th>
                  <th className="p-6">Stock Level</th>
                  <th className="p-6">Price</th>
                  <th className="p-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {/* Schema fields: name, category, barcode, stock, price */}
                <ProductRow
                  name="Nike Air Runner"
                  cat="Footwear"
                  code="890123445"
                  stock={45}
                  price="120.00"
                />
                <ProductRow
                  name="Apple iPhone 15"
                  cat="Electronics"
                  code="112233445"
                  stock={12}
                  price="999.00"
                />
                <ProductRow
                  name="Gamer Keyboard"
                  cat="Accessories"
                  code="556677889"
                  stock={0}
                  price="45.00"
                />
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- BOTTOM MOBILE NAV --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 px-10 py-4 flex justify-between items-center md:hidden z-50">
        <button className="text-blue-600 flex flex-col items-center gap-1">
          <span>🏠</span>
          <span className="text-[9px] font-bold">HOME</span>
        </button>
        <button className="text-slate-400 flex flex-col items-center gap-1">
          <span>📦</span>
          <span className="text-[9px] font-bold">STOCK</span>
        </button>
        <button className="text-slate-400 flex flex-col items-center gap-1">
          <span>📷</span>
          <span className="text-[9px] font-bold">SCAN</span>
        </button>
        <button className="text-slate-400 flex flex-col items-center gap-1">
          <span>👤</span>
          <span className="text-[9px] font-bold">USER</span>
        </button>
      </nav>
    </div>
  );
};

// Table Row Component based on Schema
const ProductRow = ({ name, cat, code, stock, price }) => (
  <tr className="hover:bg-slate-50/50 transition group">
    <td className="p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg">
          🛍️
        </div>
        <div>
          <p className="font-bold text-slate-800">{name}</p>
          <p className="text-[10px] font-bold text-blue-500 uppercase">{cat}</p>
        </div>
      </div>
    </td>
    <td className="p-6">
      <code className="bg-slate-100 px-2 py-1 rounded text-xs text-slate-600 font-mono">
        {code}
      </code>
    </td>
    <td className="p-6">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${stock > 0 ? "bg-emerald-500" : "bg-rose-500 animate-pulse"}`}
        ></div>
        <span
          className={`font-black ${stock === 0 ? "text-rose-600" : "text-slate-700"}`}
        >
          {stock} in stock
        </span>
      </div>
    </td>
    <td className="p-6 font-black text-slate-900">${price}</td>
    <td className="p-6 text-right">
      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
    </td>
  </tr>
);

export default POSDashboard;
