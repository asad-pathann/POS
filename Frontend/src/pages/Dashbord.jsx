import React, { useEffect, useState } from "react";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  Package,
  Percent,
  DollarSign,
  Users,
  BarChart3,
  Megaphone,
  Settings,
  Store,
  MonitorSmartphone,
  Search,
  Bell,
  Mail,
  Download,
  Upload,
  Plus,
  Calendar,
  ChevronDown,
  SlidersHorizontal,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { products } from "../Components/data";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashbord() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/product-card");
    } else if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1A1C1E] font-sans antialiased overflow-hidden">
      {/* --- SIDEBAR (Desktop & Mobile Drawer) --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E9ECEF] flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between px-2 py-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">
                F
              </div>
              <span className="font-bold text-lg tracking-tight">
                Fixoria sales
              </span>
            </div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-6 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3">
                Main Menu
              </span>
              <ul className="mt-2 space-y-1">
                <SidebarLink icon={<Home size={18} />} label="Home" />
                <SidebarLink
                  icon={<ShoppingBag size={18} />}
                  label="My Store"
                  active
                  dropdown
                >
                  <ul className="pl-9 mt-1 space-y-1 text-sm text-gray-500">
                    <li className="py-1.5 font-medium text-black cursor-pointer">
                      Products
                    </li>
                    <li className="py-1.5 hover:text-black cursor-pointer">
                      Orders
                    </li>
                    <li className="py-1.5 hover:text-black cursor-pointer">
                      Inventory
                    </li>
                    <li className="py-1.5 hover:text-black cursor-pointer">
                      Discount
                    </li>
                  </ul>
                </SidebarLink>
                <SidebarLink
                  icon={<DollarSign size={18} />}
                  label="Finance"
                  dropdown
                />
                <SidebarLink icon={<Users size={18} />} label="Customers" />
                <SidebarLink
                  icon={<BarChart3 size={18} />}
                  label="Analytics Report"
                  dropdown
                />
                <SidebarLink icon={<Megaphone size={18} />} label="Marketing" />
                <SidebarLink icon={<Settings size={18} />} label="Settings" />
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3">
                Sales Channels
              </span>
              <ul className="mt-2 space-y-1">
                <SidebarLink icon={<Store size={18} />} label="Online Store" />
                <SidebarLink
                  icon={<MonitorSmartphone size={18} />}
                  label="Point of Sale"
                />
              </ul>
            </div>
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="border-t border-[#E9ECEF] pt-4 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
              alt="Avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <h4 className="text-sm font-semibold leading-none">
                {user?.f_name}
              </h4>
              <span className="text-[11px] text-gray-400">
                CEO-Fixoriastudio
              </span>
            </div>
          </div>
          <ChevronDown size={16} className="text-gray-400 cursor-pointer" />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#E9ECEF] flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button
              className="lg:hidden p-1 hover:bg-gray-100 rounded-md"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#F8F9FA] pl-9 pr-4 py-2 text-sm rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Mail size={20} />
            </button>
          </div>
        </header>

        {/* Dashboard Dynamic View Wrapper */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Page Title & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-xl font-bold tracking-tight">Products List</h1>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E9ECEF] rounded-lg text-sm font-medium hover:bg-gray-50">
                <Download size={16} /> Import
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E9ECEF] rounded-lg text-sm font-medium hover:bg-gray-50">
                <Upload size={16} /> Export
              </button>
              <Link to={"/product"}>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-[#6320EE] text-white rounded-lg text-sm font-medium hover:bg-[#5119C7] shadow-sm">
                  <Plus size={16} /> Add Product
                </button>
              </Link>
            </div>
          </div>

          {/* --- TABLE CARD CONTAINER --- */}
          <div className="bg-white border border-[#E9ECEF] rounded-xl shadow-sm overflow-hidden">
            {/* Filters Bar */}
            <div className="p-4 border-b border-[#E9ECEF] flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
              <div className="relative flex-1 max-w-xs">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-white border border-[#E9ECEF] pl-9 pr-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-2 border border-[#E9ECEF] rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  <Calendar size={15} /> 12 Sep - 28 Oct 2024{" "}
                  <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 border border-[#E9ECEF] rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Status <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 border border-[#E9ECEF] rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Category <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 border border-[#E9ECEF] rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  <SlidersHorizontal size={15} /> Filter
                </button>
              </div>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#F8F9FA] border-b border-[#E9ECEF] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="p-4 w-12">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </th>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9ECEF] text-sm font-medium">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                          />
                          <span className="text-gray-900 font-semibold">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500">{product.category}</td>
                      <td className="p-4">
                        <span
                          className={`
                          ${product.stockStatus === "low" ? "text-amber-600" : ""}
                          ${product.stockStatus === "empty" ? "text-red-500 font-semibold" : ""}
                          ${product.stockStatus === "normal" ? "text-gray-600" : ""}
                        `}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4 text-gray-900">{product.price}</td>
                      <td className="p-4">
                        <StatusBadge
                          status={product.status}
                          type={product.statusColor}
                        />
                      </td>
                      <td className="p-4 text-center">
                        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-[#E9ECEF] flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span>Result 1-10 of 45</span>
                <select className="bg-white border border-[#E9ECEF] rounded px-2 py-1 text-sm focus:outline-none">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center gap-1 font-semibold">
                <button
                  className="p-2 border border-[#E9ECEF] rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#6320EE] bg-purple-50 text-[#6320EE]">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent hover:border-[#E9ECEF] hover:bg-gray-50">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent hover:border-[#E9ECEF] hover:bg-gray-50">
                  3
                </button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent hover:border-[#E9ECEF] hover:bg-gray-50">
                  12
                </button>
                <button className="p-2 border border-[#E9ECEF] rounded-lg hover:bg-gray-50">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

function SidebarLink({ icon, label, active, dropdown, children }) {
  return (
    <li>
      <div
        className={`
        flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium
        ${active ? "bg-gray-50 text-black" : "text-gray-600 hover:bg-gray-50/70 hover:text-black"}
      `}
      >
        <div className="flex items-center gap-3">
          <span className={active ? "text-black" : "text-gray-400"}>
            {icon}
          </span>
          <span>{label}</span>
        </div>
        {dropdown && <ChevronDown size={14} className="text-gray-400" />}
      </div>
      {children}
    </li>
  );
}

function StatusBadge({ status, type }) {
  const styles = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    red: "bg-rose-50 text-rose-600 border-rose-200/60",
    yellow: "bg-amber-50 text-amber-600 border-amber-200/60",
    gray: "bg-gray-50 text-gray-600 border-gray-200/60",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[type] || styles.gray}`}
    >
      {status}
      <ChevronDown size={12} className="opacity-70" />
    </span>
  );
}
