import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export const Nav = () => {
  const isActive = (path) => location.pathname === path;
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 w-full border-b border-slate-100 px-4 sm:px-6 py-4 backdrop-blur-md transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 w-full">
          {/* Logo (Left Side) */}
          <div className="flex items-center gap-4  ">
            <div className=" cursor-pointer">
              <FaArrowLeft
                onClick={() => navigate(-1)}
                className="hover:-translate-x-2 transition-all duration-200"
              />
            </div>
            <Link
              to="/product-card"
              className="flex items-center gap-2 group shrink-0"
            >
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-200 group-hover:scale-105 transition-transform">
                D
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Darza<span className="text-blue-600">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links (Center / Right Aligned perfectly) */}
          <div className="hidden md:flex items-center justify-end flex-1 gap-8 font-bold text-sm text-slate-600 px-4">
            <Link
              to="/"
              className={`transition-colors hover:text-slate-900 ${isActive("/") ? "text-blue-600" : ""}`}
            >
              Browse Market
            </Link>
            <Link
              to="/product-card"
              className={`transition-colors hover:text-slate-900 ${isActive("/orders") ? "text-blue-600" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/sell"
              className="text-blue-600 relative after:absolute after:bottom-[-22px] after:left-0 after:w-full after:h-[3px] after:bg-blue-600 after:rounded-full"
            >
              Sell Item
            </Link>
          </div>

          {/* Action Buttons & Profile (Right Side) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Notification Bell */}
            <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-xl hover:bg-slate-50">
              <span className="text-xl block">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Profile Info */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200---------">
              <span className="hidden sm:block text-xs font-black text-slate-600">
                {user?.name ? user.name : "Guest Seller"}
              </span>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-100 rounded-full flex items-center justify-center font-black text-blue-600 shadow-sm cursor-pointer hover:scale-105 transition-transform">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
