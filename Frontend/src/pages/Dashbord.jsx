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
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

// Slices aur Actions
import {
  deleteProduct_Slice,
  getProduct_Slice,
} from "../feature/productsSlice";
import { get_order_slice } from "../feature/orderSlice";
import UpdateForm from "../Components/produts/UpdateForm";
import axios from "axios";
import toast from "react-hot-toast";

export default function Dashbord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Modal aur Editing States
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth State
  const { user } = useSelector((state) => state.auth);

  // Redux Products & Orders State
  const product = useSelector((state) => state.products?.product || []);
  const productLoading = useSelector(
    (state) => state.products?.productLoading || false,
  );
  const { orders, orderLoading } = useSelector((state) => state.orders);

  // 1. DELETE HANDLER
  const handleDelete = (item) => {
    if (!item?._id || !user?._id) return;
    if (window.confirm("Kya aap waqai yeh product delete karna chahte hain?")) {
      dispatch(
        deleteProduct_Slice({
          product_id: item._id,
          user_id: user._id,
        }),
      );
    }
  };

  // 2. UPDATE HANDLER (Form submit hone par chalega)
  const handleUpdate = async (updatedData) => {
    try {
      // API call jo database mein product update karegi
      await axios.put(
        `http://localhost:8888/api/products/update-product/${editItem?._id}/${user?._id}`,
        updatedData, // Jo data user ne form mein edit kiya
      );

      // Modal ko close karo aur state clear karo
      setOpen(false);
      setEditItem(null);

      // Redux store se fresh list dobara mangwao taake UI update ho jaye
      dispatch(getProduct_Slice());

      toast.success("product Successfuly update");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Product update karne mein masla aya.");
    }
  };

  // 3. EDIT BUTTON CLICK HANDLER (Sirf modal open karega aur data set karega)
  const handleEditClick = (item) => {
    setEditItem(item); // Selected product ka data state mein save kiya
    setOpen(true); // Modal open kiya
  };

  // Auth & Initial Data Fetching
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (user?.role !== "admin") {
      navigate("/product-card");
      return;
    }

    if (user && user.role === "admin") {
      dispatch(getProduct_Slice());
      dispatch(get_order_slice());
    }
  }, [navigate, user, dispatch]);

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1A1C1E] font-sans antialiased overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E9ECEF] flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <div className="max-w-3xl mx-start w-full -mt-3 pt-4 border-t border-slate-200 flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg shadow-sm transition-all duration-200 group active:scale-95"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Wapas Jayein (Go Back)
            </button>
          </div>
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
                    <Link to={"/get-order"}>
                      <li className="py-1.5 hover:text-black cursor-pointer">
                        Orders
                      </li>
                    </Link>
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
          </nav>
        </div>
        <div className="border-t border-[#E9ECEF] pt-4 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
              alt="Avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <h4 className="text-sm font-semibold leading-none">
                {user?.f_name || "Admin"}
              </h4>
              <span className="text-[11px] text-gray-400">
                CEO-Fixoriastudio
              </span>
            </div>
          </div>
          <ChevronDown size={16} className="text-gray-400 cursor-pointer" />
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
            <span className="font-bold text-lg tracking-tight">
              Fixoria sales
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-xl font-bold tracking-tight">Products List</h1>
            <Link to={"/product"}>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-[#6320EE] text-white rounded-lg text-sm font-medium hover:bg-[#5119C7] shadow-sm">
                <Plus size={16} /> Add Product
              </button>
            </Link>
          </div>

          {/* --- TABLE CARD --- */}
          <div className="bg-white border border-[#E9ECEF] rounded-xl shadow-sm overflow-hidden">
            {productLoading ? (
              <div className="p-8 text-center text-gray-500 font-medium">
                Loading Products...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#F8F9FA] border-b border-[#E9ECEF] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="p-4 w-12"></th>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9ECEF] text-sm font-medium">
                    {product && product.length > 0 ? (
                      product.map((item) => (
                        <tr
                          key={item._id || item.id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="p-4"></td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  item?.img ||
                                  item?.image ||
                                  "https://via.placeholder.com/40"
                                }
                                className="w-20 h-15 rounded-lg object-cover bg-gray-100"
                                alt={item?.name || "product"}
                              />
                              <span className="text-gray-900 font-semibold">
                                {item.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-500">{item.category}</td>
                          <td className="p-4">
                            <span
                              className={
                                item.stockStatus === "low"
                                  ? "text-amber-600"
                                  : item.stockStatus === "empty"
                                    ? "text-red-500 font-semibold"
                                    : "text-gray-600"
                              }
                            >
                              {item.stock}
                            </span>
                          </td>
                          <td className="p-4 text-gray-900">
                            <span>PKR {item.price}</span>
                          </td>
                          <td className="p-4">
                            <StatusBadge
                              status={item.status || "Active"}
                              type={item.statusColor || "green"}
                            />
                          </td>
                          <td className="p-4 flex gap-3 items-center justify-center">
                            <button
                              onClick={() => handleDelete(item)}
                              className="text-red-400 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center bg-gray-100 hover:text-red-600 p-1"
                            >
                              <FaTrashAlt />
                            </button>
                            <button
                              onClick={() => handleEditClick(item)}
                              className="text-green-400 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center bg-gray-100 hover:text-green-600 p-1"
                            >
                              <FaEdit />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="p-8 text-center text-gray-400"
                        >
                          No products found in store.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* --- GLOBAL UPDATE MODAL --- */}
      {/* Table loop se bahar nikal diya taake sirf ek hi modal pure page par maintain ho */}
      {open && editItem && (
        <UpdateForm
          handleUpdate={handleUpdate}
          open={open}
          setOpen={setOpen}
          item={editItem}
        />
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---
function SidebarLink({ icon, label, active, dropdown, children }) {
  return (
    <li>
      <div
        className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium ${active ? "bg-gray-50 text-black" : "text-gray-600 hover:bg-gray-50/70 hover:text-black"}`}
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

// Fixed syntax issue here
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
