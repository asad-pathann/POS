import React, { useEffect, useState } from "react";
import {
  MapPin,
  CreditCard,
  Calendar,
  Package,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye import kiya
import axios from "axios";

const GetOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook initialize kiya

  useEffect(() => {
    const handleOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/api/orders/get-order",
        );
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    handleOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-start w-full mt-8 pt-4 border-t border-slate-200 flex justify-center">
        <button
          onClick={() => navigate(-1)} // -1 likhne se user wapas pichle route par chala jayega, ya yahan apna route path "/" likh dein
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg shadow-sm transition-all duration-200 group active:scale-95"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Wapas Jayein (Go Back)
        </button>
      </div>
      <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 font-sans antialiased text-slate-800 flex flex-col justify-between">
        <div className="max-w-3xl mx-auto w-full space-y-4 flex-1">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <ShoppingBag size={40} className="text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm font-medium">
                No orders found.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const orderDate = new Date(order.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              );

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* Compact Header */}
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                    <div className="flex gap-4 sm:gap-6">
                      <div>
                        <span className="block text-[10px] uppercase font-semibold text-slate-400">
                          Order Placed
                        </span>
                        <span className="font-medium flex items-center gap-1 mt-0.5">
                          <Calendar size={12} /> {orderDate}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-semibold text-slate-400">
                          Total Price
                        </span>
                        <span className="font-bold text-slate-900 mt-0.5">
                          Rs. {order.totalPrice?.toLocaleString()}
                        </span>
                      </div>
                      <div className="hidden sm:block">
                        <span className="block text-[10px] uppercase font-semibold text-slate-400">
                          Ship To
                        </span>
                        <span
                          className="font-medium mt-0.5 truncate max-w-[120px] block"
                          title={order.customerName}
                        >
                          {order.customerName}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-semibold text-slate-400 sm:text-right">
                        Order ID
                      </span>
                      <span className="font-mono font-medium text-slate-500 mt-0.5 block">
                        {order._id?.slice(-8)}
                      </span>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
                    {/* Product Detail */}
                    <div className="md:col-span-2 flex gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-lg border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                        {order.product_id?.image ? (
                          <img
                            src={order.product_id.image}
                            alt={order.product_id.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package size={24} className="text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mb-1">
                          Order Confirmed
                        </span>
                        <h3 className="text-sm font-semibold text-slate-900 truncate capitalize">
                          {order.product_id?.name || "Product Name"}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {order.product_id?.des || "No description"}
                        </p>
                        <p className="text-xs font-medium text-slate-700 mt-2">
                          Rs. {order.price?.toLocaleString()}{" "}
                          <span className="text-slate-400 font-normal">
                            x {order.quantity} (Qty)
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Compact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-5 text-xs">
                      <div>
                        <h4 className="font-semibold text-slate-400 uppercase text-[10px] flex items-center gap-1 mb-1">
                          <MapPin size={12} /> Delivery Address
                        </h4>
                        <p className="font-medium text-slate-800 truncate">
                          {order.customerName}
                        </p>
                        <p className="text-slate-500 line-clamp-1">
                          {order.address}
                        </p>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          {order.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-400 uppercase text-[10px] flex items-center gap-1 mb-1">
                          <CreditCard size={12} /> Payment Method
                        </h4>
                        <p className="text-slate-600 font-medium capitalize">
                          {order.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* --- BOTTOM BACK BUTTON --- */}
      </div>
    </>
  );
};

export default GetOrder;
