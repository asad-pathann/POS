import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../Components/Navbar";

const ProductCard = ({ state }) => {
  // Quantity State
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const item = location.state;
  //   use location  sara  router ki information deta hain
  const navigete = useNavigate();

  // Product Data
  const productReview = {
    brand: "TECNO",
    name: "Tecno Camon 40 Pro 8GB+256GB PTA APPROVED",
    rating: 4.8,
    reviewsCount: 160,
    currentPrice: 66999,
    originalPrice: 75999,
    discount: 12,
    installmentStart: 3182,
    storage: "256GB",
    colors: [
      { id: 1, name: "Green", code: "bg-teal-500", active: false },
      { id: 2, name: "Black", code: "bg-gray-800", active: true },
      { id: 3, name: "Silver", code: "bg-slate-300", active: false },
    ],
  };

  const totalPrice = (item?.price || 0) * quantity;
  // Quantity Handlers
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    if (!user) {
      navigete("/");
    }
  });

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-sm border border-gray-100 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Image Section */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[350px] aspect-square bg-gray-50 flex items-center justify-center rounded-lg p-4 border border-gray-100">
              {/* Main Product Image placeholder */}
              <img
                src={item?.image}
                alt={item?.name}
                className="object-contain h-full w-full"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto justify-center w-full">
              {[1, 2, 3, 4].map((thumb) => (
                <button
                  key={thumb}
                  className={`w-14 h-14 border rounded p-1 hover:border-orange-500 transition ${thumb === 1 ? "border-orange-500" : "border-gray-200"}`}
                >
                  <img
                    src={item?.image}
                    alt="thumbnail"
                    className="object-contain w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            {/* Title and Brand */}
            <span className="text-xs bg-purple-900 text-white font-bold px-1.5 py-0.5 rounded w-fit mb-2">
              dM
            </span>
            <h1 className="text-2xl font-medium text-gray-900 leading-snug mb-2">
              {}
            </h1>

            {/* Brand & Ratings */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="text-orange-500">★★★★★</span>
              <a href="#" className="text-blue-500 hover:underline">
                Ratings {productReview.reviewsCount}
              </a>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">
                Brand:{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  {productReview.brand}
                </a>
              </span>
            </div>

            <hr className="border-gray-100 mb-4" />

            <div>
              <h3 className="capitalize font-bold mb-3 text-xl  text-gray-600 ">
                {item?.name}
              </h3>
            </div>
            {/* Pricing */}
            <div className="mb-4">
              <div className="text-3xl font-medium text-orange-600">
                Rs.
                {totalPrice}
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <span className="text-gray-400 line-through">
                  Rs.{state?.price}
                </span>
                <span className="text-gray-700 font-medium">
                  -{productReview.discount}%
                </span>
              </div>
            </div>

            {/* Installment Info */}
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded text-sm text-gray-600 mb-6 border border-gray-100">
              <span className="text-lg">📅</span>
              <span>
                Up to 36 months, as low as Rs.{" "}
                {productReview.installmentStart.toLocaleString()} per month.
              </span>
            </div>

            {/* Color Selector */}

            {/* Storage Capacity */}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-gray-800 font-bold">
                Total Stock
              </span>
              <div className="flex items-center border  px-4   border-gray-300 rounded bg-gray-50">
                {item?.stock}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <Link
                to={"/order-card"}
                state={{
                  item,
                }}
              >
                <button className="bg-[#26abd4] w-full hover:bg-[#1f93b8] text-white font-medium py-3 rounded text-center transition shadow-sm">
                  Buy Now
                </button>
              </Link>
              <button className="bg-[#f57224] hover:bg-[#d65f1a] text-white font-medium py-3 rounded text-center transition shadow-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
