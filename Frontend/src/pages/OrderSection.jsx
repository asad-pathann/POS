import React, { useState, useEffect } from "react";
import { Home, Briefcase } from "lucide-react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const item = location.state; // Previous page se item aa raha hai

  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    address: "", // Full address
    addressLabel: "HOME",
    price: "",
    quantity: "1",
    totalPrice: "",
    paymentMethod: "",
    status: "", // Promotion code
  });

  // Pre-fill data from previous page (agar item ho)
  useEffect(() => {
    if (item) {
      setFormData((prev) => ({
        ...prev,
        price: item.price || "",
        quantity: item.quantity || "1",
        totalPrice: item.totalPrice || item.price * (item.quantity || 1) || "",
      }));
    }
  }, [item]);

  // Total Price auto calculate
  useEffect(() => {
    const priceNum = parseFloat(formData.price) || 0;
    const qtyNum = parseInt(formData.quantity) || 1;
    const total = priceNum * qtyNum;

    setFormData((prev) => ({ ...prev, totalPrice: total.toFixed(0) }));
  }, [formData.price, formData.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const {
    customerName,
    phoneNumber,
    address,
    price,
    quantity,
    totalPrice,
    paymentMethod,
    status,
    addressLabel,
  } = formData;

  const handleClick = (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      deliveryFee: 150,
      grandTotal: Number(formData.totalPrice) + 150,
    };

    localStorage.setItem("order-card", JSON.stringify(orderData));

    toast.success("Order Data Successfully Added");

    setFormData((prev) => ({
      ...prev,
      customerName: "",
      phoneNumber: "",
      address: "",
      paymentMethod: "",
      status: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saveData = localStorage.getItem("order-card");

    if (!saveData) {
      alert("Please Save Information First");
      return;
    }
    let orderData = JSON.parse(saveData);
    console.log("order pleced");
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 bg-white p-6 rounded-sm shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Delivery Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={customerName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 p-2.5 rounded-sm focus:outline-none focus:border-cyan-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  placeholder="03xx-xxxxxxx"
                  className="w-full border border-gray-300 p-2.5 rounded-sm focus:outline-none focus:border-cyan-500 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (per item)
                </label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full border border-gray-300 p-2.5 rounded-sm focus:outline-none focus:border-cyan-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  min="1"
                  className="w-full border border-gray-300 p-2.5 rounded-sm focus:outline-none focus:border-cyan-500 text-sm"
                  required
                />
              </div>
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address
              </label>
              <textarea
                name="address"
                value={address}
                onChange={handleChange}
                rows="3"
                placeholder="House# 123, Street# 123, Colony, City"
                className="w-full border border-gray-300 p-2.5 rounded-sm focus:outline-none focus:border-cyan-500 text-sm resize-none"
                required
              />
            </div>

            {/* Address Label */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Address Label:
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, addressLabel: "OFFICE" }))
                  }
                  className={`flex items-center justify-center gap-2 px-6 py-2.5 border text-sm font-medium rounded-sm transition-all w-32 ${
                    addressLabel === "OFFICE"
                      ? "border-cyan-500 bg-cyan-50 text-cyan-600 font-semibold"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Briefcase size={16} />
                  OFFICE
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, addressLabel: "HOME" }))
                  }
                  className={`flex items-center justify-center gap-2 px-6 py-2.5 border text-sm font-medium rounded-sm transition-all w-32 ${
                    addressLabel === "HOME"
                      ? "border-orange-400 bg-orange-50 text-orange-500 font-semibold"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Home size={16} />
                  HOME
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <input
                type="text"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handleChange}
                placeholder="Cash on Delivery / Card / JazzCash etc."
                className="w-full border border-gray-300 p-2.5 rounded-sm focus:outline-none focus:border-cyan-500 text-sm"
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleClick}
                type="submit"
                className="bg-[#1ea6d9] hover:bg-cyan-600 text-white font-medium uppercase text-sm py-2.5 px-12 transition-colors rounded-sm shadow-sm"
              >
                Save Information
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Promotion */}
          <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm">
            <h3 className="text-gray-700 text-sm font-medium mb-2">
              Promotion
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                name="status"
                value={status}
                onChange={handleChange}
                placeholder="Enter Store/Daraz Code"
                className="flex-1 border border-gray-300 p-2 text-sm rounded-sm focus:outline-none focus:border-cyan-500"
              />
              <button className="bg-[#1ea6d9] hover:bg-cyan-600 text-white text-xs font-semibold px-4 uppercase rounded-sm transition-colors">
                Apply
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm">
            <h3 className="text-gray-800 text-base font-semibold mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm text-gray-600 border-b border-gray-100 pb-4">
              <div className="flex justify-between">
                <span>Items Total ({quantity} items)</span>
                <span className="font-medium text-gray-800">
                  Rs. {totalPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-medium text-gray-800">Rs. 150</span>
              </div>
            </div>

            <div className="pt-4 mb-5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-gray-700">
                  Total:
                </span>
                <span className="text-xl font-bold text-orange-500">
                  Rs. {Number(totalPrice) + 150}
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#f57224] hover:bg-orange-600 text-white font-medium py-3 text-sm transition-colors rounded-sm shadow-sm"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
