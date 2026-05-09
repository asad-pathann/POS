import React from "react";
import {
  FaStore,
  FaHome,
  FaFire,
  FaGem,
  FaChartBar,
  FaUser,
} from "react-icons/fa";

export const SideBar = () => {
  return (
    <>
      <aside className="hidden xl:flex flex-col w-72 bg-white h-screen sticky top-0 border-r border-gray-100 p-8 space-y-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-700 p-2 rounded-xl">
            <FaStore className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-black text-blue-900 tracking-tighter italic">
            MARKET X
          </h1>
        </div>

        <nav className="space-y-3">
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] px-4 mb-4">
            Main Menu
          </p>
          {[
            { name: "Marketplace", icon: <FaHome />, active: true },
            { name: "Trending Now", icon: <FaFire />, active: false },
            { name: "Premium Club", icon: <FaGem />, active: false },
            { name: "Sales Reports", icon: <FaChartBar />, active: false },
            { name: "My Profile", icon: <FaUser />, active: false },
          ].map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-4 px-5 py-4 rounded-[1.2rem] cursor-pointer transition-all duration-300 ${
                item.active
                  ? "bg-blue-700 text-white shadow-xl shadow-blue-100 scale-105"
                  : "text-gray-500 hover:bg-gray-50 hover:pl-7"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-bold text-[15px]">{item.name}</span>
            </div>
          ))}
        </nav>

        {/* Sidebar Help Box */}
        <div className="mt-auto bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
          <p className="text-blue-900 font-bold text-sm mb-2">Need Help?</p>
          <p className="text-blue-700/60 text-xs mb-4">
            Check our documentation for POS setup.
          </p>
          <button className="w-full bg-white text-blue-700 py-2 rounded-xl text-xs font-black shadow-sm">
            Support
          </button>
        </div>
      </aside>
    </>
  );
};
