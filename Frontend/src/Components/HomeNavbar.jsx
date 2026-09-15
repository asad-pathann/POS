import { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaShoppingCart,
  FaHeart,
  FaBell,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaInfoCircle,
  FaHome,
  FaStore,
  FaThLarge,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "./LogOut"; // ✅ apna sahi path daalo

const navItems = [
  { name: "Home", path: "/", icon: <FaHome size={13} /> },
  { name: "Shop", path: "/shop", icon: <FaStore size={13} /> },
  { name: "Categories", path: "/category", icon: <FaThLarge size={13} /> },
  { name: "About", path: "/about-page", icon: <FaInfoCircle size={13} /> },
];

const HomeNavbar = ({ searchQuery, setSearchQuery }) => {
  const { user } = useSelector((state) => state.auth);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [open, setOpen] = useState(false); // ✅ dropdown state YAHAN
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleToggle = () => setOpen((prev) => !prev);

  // ✅ Bahar click karne pe dropdown close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className=" mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* ===== TOP ROW ===== */}
          <div className="flex items-center justify-between w-full md:w-auto gap-6">
            <Link to="/" className="flex flex-col leading-none flex-shrink-0">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                Luxury <span className="text-[#f57224]">Marketplace</span>
              </h2>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : 'Results for "All Categories"'}
              </p>
            </Link>

            <nav className="hidden lg:flex items-center gap-5 text-sm font-bold text-gray-600">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-1.5 transition-colors pb-1 border-b-2 ${
                      isActive
                        ? "text-[#f57224] border-[#f57224]"
                        : "border-transparent hover:text-[#f57224]"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex lg:hidden items-center gap-2">
              <button className="relative p-2 text-gray-600 hover:text-[#f57224] transition">
                <FaBell size={16} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="relative p-2 text-gray-600 hover:text-[#f57224] transition">
                <FaShoppingCart size={16} />
                <span className="absolute -top-0.5 -right-0.5 bg-[#f57224] text-white text-[9px] px-1.5 py-0.5 rounded-full">
                  2
                </span>
              </button>
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="p-2 text-gray-700 hover:text-[#f57224] transition"
              >
                {mobileMenu ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>

          {/* ===== SEARCH + ACTIONS ===== */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-[380px] group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f57224] transition-colors" />
              <input
                type="text"
                placeholder="Search in Daraz..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#eff0f5] border border-transparent py-2.5 pl-11 pr-4 rounded-md focus:bg-white focus:border-[#f57224] outline-none transition-all text-xs font-medium"
              />
            </div>

            <button className="bg-[#eff0f5] p-2.5 rounded-md text-gray-500 hover:text-[#f57224] hover:bg-[#f57224]/10 transition-all">
              <FaFilter size={14} />
            </button>

            <div className="hidden md:flex items-center gap-1">
              <button className="relative p-2.5 text-gray-600 hover:text-[#f57224] transition">
                <FaHeart size={16} />
              </button>
              <button className="relative p-2.5 text-gray-600 hover:text-[#f57224] transition">
                <FaShoppingCart size={16} />
                <span className="absolute -top-0.5 -right-0.5 bg-[#f57224] text-white text-[9px] px-1.5 py-0.5 rounded-full">
                  2
                </span>
              </button>
            </div>

            {/* ===== LOGIN / USER ===== */}
            {user ? (
              <div ref={dropdownRef} className="relative">
                <div
                  onClick={handleToggle}
                  className="flex items-center gap-2 pl-3 border-l border-gray-200 cursor-pointer select-none"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-gray-900 leading-none">
                      {user?.f_name} {user?.l_name || ""}
                    </p>
                    <p className="text-[9px] text-[#f57224] font-extrabold uppercase mt-1">
                      Pro Member
                    </p>
                  </div>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.f_name || "User"}&background=f57224&color=fff`}
                    className="w-9 h-9 rounded-full border-2 border-[#f57224]/20 shadow-sm"
                    alt="Profile"
                  />
                </div>

                {/* ✅ Dropdown ab isi relative div ke andar hai */}
                {open && (
                  <div className="absolute right-0 top-full mt-2 w-[280px] z-[999]">
                    <LogOut />
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-[#f57224] text-white px-4 md:px-5 py-2.5 rounded-md text-xs font-bold hover:bg-[#e0651c] transition-all shadow-sm flex-shrink-0"
              >
                <FaSignInAlt size={13} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        {mobileMenu && (
          <nav className="lg:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenu(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold transition ${
                    isActive
                      ? "bg-[#f57224]/10 text-[#f57224]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#f57224]"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}

            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="flex items-center justify-center gap-2 mt-2 bg-[#f57224] text-white px-4 py-2.5 rounded-md text-sm font-bold hover:bg-[#e0651c] transition"
              >
                <FaSignInAlt size={13} />
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default HomeNavbar;
