import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MarketData } from "../Components/CategoryData";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Nav } from "../Components/produts/PostProductNav";
import toast from "react-hot-toast";
import { productPost } from "../feature/productsSlice";
// import { productPost } from "../feature/productsSlice";

const SellProducts = () => {
  const [control, setControl] = useState({
    image: null,
    name: "",
    category: "",
    price: "",
    barCode: "",
    stock: "",
    des: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const { name, category, des, stock, price, barCode } = control;
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Active path check karne ke liye helper function
  const isActive = (path) => location.pathname === path;

  // Handle Input Change
  const handleControll = (e) => {
    const { name, value } = e.target;
    setControl((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setControl((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
    setImage(file);
  };

  const PostProducts = async () => {
    try {
      setLoading(true);

      const imageUrl = await uploadImage();

      const productData = {
        name,
        des,
        stock,
        category,
        price,
        user_id: user?._id,
        image: imageUrl,
      };

      console.log(imageUrl);
      await dispatch(productPost(productData)).unwrap();
      setControl({
        name: "",
        price: "",
        stock: "",
        des: "",

        category: "",
      });
      toast.success("Product Posted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Product Not Posted");
    } finally {
      setLoading(false);
    }
  };

  // handle  the post image  seection

  const uploadImage = async () => {
    try {
      let data = new FormData();

      data.append("file", image);
      data.append("upload_preset", "posproject");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/drunmyuiq/image/upload",
        data,
      );

      return response.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/product-card");
    } else if (!user) {
      navigate("/");
    }
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen w-full pb-32 font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* ================= PREMIUM TOP NAVBAR ================= */}
      <Nav />
      <Link></Link>

      {/* ================= MAIN FORM CONTENT ================= */}
      <main className="max-w-xl mx-auto p-6 pt-10">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Sell an Item
          </h2>
          <p className="text-slate-500 font-medium mt-2 text-sm sm:text-base">
            List your product in the global marketplace with ease.
          </p>
        </div>

        <div className="space-y-6">
          {/* Image Upload Box */}
          <div className="group relative">
            <input
              onChange={handleImageChange}
              id="image"
              type="file"
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="image"
              className="block cursor-pointer focus-within:outline-none"
            >
              {preview ? (
                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm relative group">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-[320px] sm:h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl">
                    <p className="text-white font-bold bg-slate-950/60 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                      Change Photo 📷
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-200 rounded-[2rem] bg-white p-10 flex flex-col items-center justify-center hover:border-blue-500 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 group">
                  <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-slate-400 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all duration-300">
                    📷
                  </div>
                  <p className="mt-4 font-bold text-slate-600 group-hover:text-slate-800 transition-colors">
                    Click to upload product photos
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports JPG, PNG, WEBP
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 ml-1">
              Product Name
            </label>
            <input
              name="name"
              value={name}
              onChange={handleControll}
              type="text"
              placeholder="e.g. Minimalist Ceramic Vase"
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder:text-slate-400 text-slate-800 font-medium shadow-sm"
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 ml-1">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={category}
                  onChange={handleControll}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none text-slate-800 font-medium appearance-none shadow-sm cursor-pointer"
                >
                  <option value="" className="text-slate-400">
                    Select Category
                  </option>
                  {MarketData?.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold text-xs">
                  ▼
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 ml-1">
                Price (PKR)
              </label>
              <input
                name="price"
                value={price}
                onChange={handleControll}
                type="number"
                placeholder="0"
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder:text-slate-400 text-slate-800 font-medium shadow-sm"
              />
            </div>
          </div>

          {/* Stock & Barcode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 ml-1">
                Initial Stock
              </label>
              <input
                name="stock"
                value={stock}
                onChange={handleControll}
                type="number"
                placeholder="0"
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder:text-slate-400 text-slate-800 font-medium shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 ml-1">
                Barcode / SKU
              </label>
              <input
                name="barCode"
                value={barCode}
                onChange={handleControll}
                type="text"
                placeholder="Enter barcode"
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder:text-slate-400 text-slate-800 font-medium shadow-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 ml-1">
              Description
            </label>
            <textarea
              name="des"
              value={des}
              onChange={handleControll}
              rows="4"
              placeholder="Describe your item's condition, features, or details..."
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none resize-none placeholder:text-slate-400 text-slate-800 font-medium shadow-sm"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={PostProducts}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-400 disabled:pointer-events-none text-white font-bold py-5 rounded-[2rem] shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-200 text-lg mt-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Posting...
              </span>
            ) : (
              "Post Product"
            )}
          </button>
        </div>
      </main>

      {/* ================= BOTTOM NAVIGATION BAR (MOBILE) ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-slate-100 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex flex-col items-center gap-1 group">
          <span
            className={`text-xl transition-transform group-hover:-translate-y-0.5 ${isActive("/") ? "opacity-100" : "opacity-50"}`}
          >
            🏠
          </span>
          <span
            className={`text-[10px] font-black tracking-wide ${isActive("/") ? "text-blue-600" : "text-slate-400"}`}
          >
            Home
          </span>
        </Link>

        <Link to="/orders" className="flex flex-col items-center gap-1 group">
          <span
            className={`text-xl transition-transform group-hover:-translate-y-0.5 ${isActive("/orders") ? "opacity-100" : "opacity-50"}`}
          >
            📦
          </span>
          <span
            className={`text-[10px] font-black tracking-wide ${isActive("/orders") ? "text-blue-600" : "text-slate-400"}`}
          >
            Orders
          </span>
        </Link>

        {/* Floating Center Button for 'Sell' */}
        <Link to="/sell" className="flex flex-col items-center group -mt-9">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg border-4 border-white transition-all group-hover:scale-105 active:scale-95 ${isActive("/sell") ? "bg-blue-600 text-white shadow-blue-200" : "bg-slate-800 text-white"}`}
          >
            ✨
          </div>
          <span
            className={`text-[10px] font-black tracking-wide mt-1 ${isActive("/sell") ? "text-blue-600" : "text-slate-400"}`}
          >
            Sell
          </span>
        </Link>

        <Link to="/profile" className="flex flex-col items-center gap-1 group">
          <span
            className={`text-xl transition-transform group-hover:-translate-y-0.5 ${isActive("/profile") ? "opacity-100" : "opacity-50"}`}
          >
            👤
          </span>
          <span
            className={`text-[10px] font-black tracking-wide ${isActive("/profile") ? "text-blue-600" : "text-slate-400"}`}
          >
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SellProducts;
