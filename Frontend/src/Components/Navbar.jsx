import { Link } from "react-router-dom";

export const Navbar = () => (
  <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 shadow-sm">
    <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-6">
      {/* Logo */}
      <span className="text-xl font-black text-[#1E3A8A] flex-shrink-0">
        Marketplace
      </span>

      {/* Navigation Links - Hidden on Mobile */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-600">
        {["Home", "Shop", "Categories", "About"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-blue-600 transition"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Search Bar */}
      <div className="flex-1 flex  items-center  max-w-md  hidden md:block">
        <div className="flex focus:ring-2 items-center  focus:ring-blue-500 bg-gray-200 rounded-full px-2   ">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 rounded-full py-2 flex  bg-gray-200  items-center px-10 text-sm  w-full  outline-0"
          />
          <span className="">🔍</span>
        </div>
      </div>

      {/* Icons & Sign In */}
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <span className="text-2xl">🛒</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full border-2 border-white">
            2
          </span>
        </div>
        <Link to="/register">
          <button className="bg-[#1E3A8A] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-800 transition">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  </header>
);
