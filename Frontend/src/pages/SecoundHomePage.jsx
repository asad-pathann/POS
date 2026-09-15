import React, { useEffect, useState } from "react";
import { products } from "./../Components/data";
import { FaSearch, FaFilter, FaBolt, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOut } from "../Components/LogOut";
import HomeNavbar from "../Components/HomeNavbar";

const SecoundHomePage = ({ productData }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [storeData, setStoreData] = useState([]);

  // SEARCH STATE: User ka input store karne ke liye
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("useEffect chal gaya");

    const handleData = async () => {
      try {
        console.log("API call ho rahi hai");
        const response = await axios.get(
          "http://localhost:8888/api/products/get-product",
        );
        setStoreData(response.data);
      } catch (error) {
        console.log("ERROR:", error);
      }
    };

    handleData();

    if (!user) {
      navigate("/");
    }
  }, [user, navigate]); // Added standard dependencies

  const handleToggle = () => {
    setOpen(!open);
  };

  // SEARCH FILTER LOGIC: Jo products ke name se match karega wahi filter hoga
  const filteredProducts = storeData?.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex bg-[#eff0f5] min-h-screen w-full font-sans antialiased">
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 sm:px-4 lg:px-6  w-full overflow-x-hidden">
        <HomeNavbar
          className="w-full"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleToggle={handleToggle}
          open={open}
        />
        {/* PROMO BANNER */}
        <div className="hidden xl:flex bg-gradient-to-r  h-[350px] mt-5 from-orange-600 to-[#f57224] p-8 mb-6 items-center justify-between text-white shadow-sm relative overflow-hidden">
          <div className="space-y-3 relative z-10 max-w-md">
            <span className="bg-white/20 text-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest">
              6.6 Mid Year Sale
            </span>
            <h3 className="text-3xl font-black leading-tight">
              Upgrade Your Gear <br /> Up to 40% Off
            </h3>
            <button className="bg-white text-[#f57224] px-5 py-2 text-xs font-bold shadow-sm hover:bg-orange-50 transition-all">
              Shop Now
            </button>
          </div>
          <FaBolt className="text-white/5 text-[12rem] absolute -right-5 -bottom-5 rotate-12 pointer-events-none" />
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Apple-Watch-PNG-Clipart.png"
            className="w-44 drop-shadow-2xl relative z-10"
            alt="Promo"
          />
        </div>
        {/* CATEGORY TABS */}
        <div className="flex items-center justify-between mb-4 overflow-x-auto no-scrollbar gap-4 bg-white p-2 shadow-sm">
          <div className="flex gap-2">
            {[
              "All Items",
              "Technology",
              "Category",
              "Lifestyle",
              "Office",
              "Travel",
            ].map((tab, i) => (
              <Link
                key={tab}
                to={`/category`}
                className={`px-4 py-1.5 whitespace-nowrap text-xs transition-all ${
                  i === 0
                    ? "bg-[#f57224] text-white font-bold"
                    : "bg-white text-gray-700 hover:text-[#f57224]"
                }`}
              >
                {tab}
              </Link>
            ))}
          </div>
          <button className="text-gray-500 text-xs flex items-center gap-1 hover:text-[#f57224] transition-colors whitespace-nowrap pr-2">
            Filter View <FaChevronDown className="-rotate-90" size={10} />
          </button>
        </div>
        {/* PRODUCT GRID - Ab storeData ki jagah filteredProducts render hoga */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((item) => {
              return (
                <div
                  key={item._id}
                  className={`bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col justify-between group ${
                    productData?.stock === 0 ? "hidden" : "block"
                  }`}
                >
                  <Link to="/card-product" state={item}>
                    <div>
                      <div className="relative w-full aspect-square bg-white overflow-hidden flex items-center justify-center p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-w-full max-h-full object-fill group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>

                      <div className="p-2.5 pb-1">
                        <h3 className="text-xs text-gray-800">{item.name}</h3>
                      </div>
                    </div>

                    <div className="p-2.5 pt-0 mt-auto">
                      <div className="text-[#f57224] text-base font-medium">
                        Rs.{item.price}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            // Jab koi product match na ho toh empty state message dikhane ke liye
            <div className="col-span-full text-center py-12 text-sm text-gray-400 bg-white shadow-sm">
              No products found matching "{searchQuery}"
            </div>
          )}
        </div>
        {/* BOTTOM PAGINATION */}
        {filteredProducts?.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-1.5 bg-white border border-gray-300 px-10 py-2 text-gray-800 text-xs font-medium hover:border-[#f57224] hover:text-[#f57224] transition-all">
              Load More Products{" "}
              <FaChevronDown size={10} className="text-gray-400" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SecoundHomePage;
