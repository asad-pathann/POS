import React, { useState, useEffect } from "react";
import {
  Home,
  Briefcase,
  Truck,
  CreditCard,
  Tag,
  ShoppingBag,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { order_slice, resetOrder } from "../feature/orderSlice";
import axios from "axios";
import OrderSummaryUI from "../Components/produts/OrderSaveData";

export default function CheckoutPage() {
  const location = useLocation();
  const { item } = location.state || {};

  console.log(item?.image);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { order, orderLoading, orderError, orderSuccess, orderMessage } =
    useSelector((state) => state.order);
  const [orderSaveData, setorderSaveData] = useState(false);

  // ==================== FORM STATE ====================
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
    addressLabel: "HOME",
    price: "",
    quantity: "1",
    totalPrice: "",
    paymentMethod: "",
    promotionCode: "",
  });

  const [isPriceLocked, setIsPriceLocked] = useState(false);

  // ==================== INITIAL DATA FROM PREVIOUS PAGE ====================
  useEffect(() => {
    if (item?.price) {
      const price = Number(item.price);
      const quantity = Number(item.quantity) || 1;

      setFormData((prev) => ({
        ...prev,
        price: String(price),
        quantity: String(quantity),
        totalPrice: String(price * quantity),
      }));
      setIsPriceLocked(true);
    }
  }, [item]);

  // ==================== AUTO CALCULATE TOTAL ====================
  useEffect(() => {
    const price = Number(formData.price) || 0;
    const quantity = Number(formData.quantity) || 1;

    setFormData((prev) => ({
      ...prev,
      totalPrice: String(price * quantity),
    }));
  }, [formData.price, formData.quantity]);

  // ==================== HANDLERS ====================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isPriceLocked && name === "price") {
      toast.error("Price is locked from product page!");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectLabel = (label) => {
    setFormData((prev) => ({ ...prev, addressLabel: label }));
  };

  // ==================== SAVE ORDER (FIXED) ====================
  const saveOrder = async (e) => {
    e.preventDefault();

    // 1. Basic validation
    if (!formData.customerName || !formData.phoneNumber || !formData.address) {
      toast.error("Please fill all required fields!");
      return;
    }

    // 2. STOCK VALIDATION (Strict Number Parsing)
    const availbalStock = Number(item?.stock) || 0;
    const enteredQuantity = Number(formData.quantity) || 0;

    if (enteredQuantity > availbalStock) {
      toast.error(`Stock not available! Only ${availbalStock} items left.`);
      return; // ❌ Yahan se function ruk jayega, aage ka code execute nahi hoga!
    }

    // 3. Prepare Order Data
    const orderData = {
      ...formData,
      quantity: enteredQuantity, // Explicitly number bhejein
      price: Number(formData.price),
      totalPrice: Number(formData.totalPrice),
      user_id: user?._id,
      product_id: item?._id,
      grandTotal: Number(formData.totalPrice) + 150,
    };

    // 4. Save to LocalStorage & State if stock is valid
    localStorage.setItem("order-card", JSON.stringify(orderData));
    toast.success("Order saved successfully!");
    setorderSaveData(true);
  };

  const proceedToPay = (e) => {
    e.preventDefault();
    const availbalStock = Number(item?.stock) || 0;
    const enteredQuantity = Number(formData.quantity) || 0;

    if (enteredQuantity > availbalStock) {
      toast.error(`Stock not available! Only ${availbalStock} items left.`);
      return; // ❌ Yahan se function ruk jayega, aage ka code execute nahi hoga!
    }
    const orderData = {
      ...formData,
      quantity: enteredQuantity, // Explicitly number bhejein
      price: Number(formData.price),
      totalPrice: Number(formData.totalPrice),
      user_id: user?._id,
      product_id: item?._id,
      grandTotal: Number(formData.totalPrice) + 150,
    };

    const savedOrder = localStorage.getItem("order-card");
    if (!savedOrder) {
      toast.error("Please save order first!");
      return;
    }
    dispatch(order_slice(orderData));

    toast.success("Proceeding to payment...");
    // navigate("/payment");
  };

  // Destructure
  const {
    customerName,
    phoneNumber,
    address,
    price,
    quantity,
    totalPrice,
    paymentMethod,
    promotionCode,
    addressLabel,
  } = formData;

  const grandTotal = Number(totalPrice) + 150;

  useEffect(() => {
    if (item?.stock - quantity) {
      return;
    }
    if (orderError) {
      toast.error(orderMessage);
    }
    if (orderSuccess) {
      toast.success("order Successfuly  add");
    }
    dispatch(resetOrder());
  }, [orderError, orderSuccess, orderMessage, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <ShoppingBag className="text-orange-500" />
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ==================== LEFT: FORM ==================== */}
          <div
            className={`lg:col-span-2  p-6 rounded-lg shadow ${orderSaveData ? "bg-gray-100" : "bg-white"}`}
          >
            {orderSaveData ? (
              <OrderSummaryUI orderData={formData} product={item} />
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Truck size={18} /> Delivery Information
                </h2>

                <form onSubmit={saveOrder} className="space-y-4">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={customerName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full border p-2 rounded focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleChange}
                        placeholder="03xx-xxxxxxx"
                        className="w-full border p-2 rounded focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Price & Quantity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Price *{" "}
                        {isPriceLocked && (
                          <span className="text-blue-500">🔒 Locked</span>
                        )}
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={handleChange}
                        disabled={isPriceLocked}
                        className={`w-full border p-2 rounded outline-none ${
                          isPriceLocked
                            ? "bg-gray-100 cursor-not-allowed"
                            : "focus:border-blue-500"
                        }`}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={handleChange}
                        min="1"
                        max={item?.stock}
                        className="w-full border p-2 rounded focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={address}
                      onChange={handleChange}
                      rows="3"
                      placeholder="House# 123, Street# 123, City"
                      className="w-full border p-2 rounded focus:border-blue-500 outline-none resize-none"
                      required
                    />
                  </div>

                  {/* Address Label */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Address Label
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => selectLabel("OFFICE")}
                        className={`flex items-center gap-2 px-4 py-2 border rounded ${
                          addressLabel === "OFFICE"
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <Briefcase size={16} /> Office
                      </button>
                      <button
                        type="button"
                        onClick={() => selectLabel("HOME")}
                        className={`flex items-center gap-2 px-4 py-2 border rounded ${
                          addressLabel === "HOME"
                            ? "border-orange-400 bg-orange-50 text-orange-500"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <Home size={16} /> Home
                      </button>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Payment Method *
                    </label>
                    <div className="relative">
                      <CreditCard
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="paymentMethod"
                        value={paymentMethod}
                        onChange={handleChange}
                        placeholder="Cash on Delivery / Card / JazzCash"
                        className="w-full border p-2 pl-10 rounded focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded transition"
                  >
                    💾 Save Order
                  </button>
                </form>
              </>
            )}
          </div>
          {/* ==================== RIGHT: SUMMARY ==================== */}
          <div className="space-y-4">
            {/* Promotion */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Tag size={16} /> Promotion
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="promotionCode"
                  value={promotionCode}
                  onChange={handleChange}
                  placeholder="Enter code"
                  className="flex-1 border p-2 rounded focus:border-blue-500 outline-none text-sm"
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Order Summary</h3>

              <div className="space-y-2 text-sm border-b pb-3">
                <div className="flex justify-between">
                  <span>Price per item</span>
                  <span className="font-medium">Rs. {price || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span className="font-medium">× {quantity || 1}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items Total</span>
                  <span className="font-medium">Rs. {totalPrice || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium">Rs. 150</span>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <span className="font-semibold">Grand Total</span>
                <span className="text-xl font-bold text-orange-500">
                  Rs. {grandTotal}
                </span>
              </div>

              <button
                onClick={proceedToPay}
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded transition"
              >
                {/* {orderLoading ? (
                  <Rings size={"20px"} className="mx-auto" />
                ) : (
               
                )} */}
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
