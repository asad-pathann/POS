import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/category" },
  { name: "About", path: "/about" },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <span className="text-xl flex gap-6 items-center font-black text-[#1E3A8A] flex-shrink-0">
          <div
            onClick={() => navigate(-1)}
            className="hover:bg-gray-300 rounded-full transition duration-200 hover:text-white h-[30px] w-[30px] p-2 flex items-center justify-center cursor-pointer"
          >
            <FaArrowLeft />
          </div>
          Marketplace
        </span>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-600">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-blue-600 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="flex items-center bg-gray-200 rounded-full px-2 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent py-2 px-4 text-sm outline-0"
            />
            <span>🔍</span>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full border-2 border-white">
              2
            </span>
          </div>

          <Link to="/register">
            <button className="bg-[#1E3A8A] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-800 transition">
              {user?.role ? "" : " Sign In"}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
