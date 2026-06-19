import React from "react";
import { CheckCircle } from "lucide-react";

export default function OrderSummaryUI({ orderData, product }) {
  // Dummy data jo aapki image se match karta hai
  const shippingInfo = {
    name: "Asad Ullah",
    phone: "03476287277",
    label: "HOME",
    address: "Islamabad, Barkhan, Barkhan, Balochistan",
  };

  const productInfo = {
    title:
      "Multicolor inner caps for hijab/ inner hijab cap/ inner caps/ inner scarf cap For Women",
    brand: "No Brand",
    color: "Black",
    size: "Adjustable",
    price: 88,
    originalPrice: 200,
    discount: "-56%",
    quantity: 1,
    stockLeft: 1,
    seller: "Ayaan Hijab Store",
    deliveryFee: 220,
    deliveryDate: "23-26 Jun",
  };

  console.log(orderData);

  return (
    <div className="  bg-gray-100  md:p-8 font-sans">
      <div className="max-w-4xl mx-auto w-full space-y-4">
        {/* ==================== SECTION 1: SHIPPING & BILLING ==================== */}
        <div className="bg-white rounded-sm w-full shadow-sm p-4">
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <h2 className="text-gray-700 font-medium text-sm md:text-base">
              Shipping & Billing
            </h2>
            <button className="text-cyan-500 hover:text-cyan-600 font-medium text-xs md:text-sm tracking-wide">
              EDIT
            </button>
          </div>

          <div className="space-y-2 text-sm text-gray-800">
            <div className="flex items-center gap-4">
              <span className="font-medium">{orderData?.customerName}</span>
              <span className="text-gray-600">{orderData?.phoneNumber}</span>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm mt-0.5 shrink-0">
                {shippingInfo.label}
              </span>
              <p className="text-gray-600 text-sm leading-relaxed">
                {orderData.address}
              </p>
            </div>
          </div>
        </div>

        {/* ==================== SECTION 2: PACKAGE DETAILS ==================== */}
        <div className="bg-white rounded-sm shadow-sm p-4">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h3 className="font-semibold text-sm text-gray-800">
              Package 1 of 1
            </h3>
            <p className="text-xs text-gray-500">
              Shipped by{" "}
              <span className="text-gray-800 font-medium">
                {productInfo.seller}
              </span>
            </p>
          </div>

          {/* Delivery Options */}
          <div className="mb-6">
            <h4 className="text-xs font-medium text-gray-500 mb-2">
              Delivery or Pickup
            </h4>

            {/* Delivery Card */}
            <div className="border border-cyan-500 bg-white p-4 rounded-sm max-w-xs relative flex items-start gap-3">
              <CheckCircle
                className="text-cyan-500 shrink-0 mt-0.5"
                size={18}
                fill="currentColor"
                fillOpacity={0.1}
              />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-800">
                  Rs. {orderData.deliveryFee}
                </p>
                <p className="text-xs text-gray-600">Standard Delivery</p>
                <p className="text-xs text-gray-500 pt-3">
                  Guaranteed by {orderData.deliveryDate}
                </p>
              </div>
            </div>
          </div>

          {/* Product Details Row */}
          <div className="flex flex-col md:flex-row gap-4 pt-2">
            {/* Product Image Placeholder */}
            <div className="w-20 h-20 bg-gray-200 rounded-sm shrink-0 overflow-hidden border border-gray-200">
              <img src={product?.image} alt="" />
            </div>

            {/* Product Text Meta */}
            <div className="flex-1 space-y-1">
              <h4 className="text-gray-800 text-sm leading-snug font-normal line-clamp-2 md:line-clamp-none">
                {product.des}
              </h4>
              <p className="text-xs text-gray-400">
                {productInfo.brand}, Color Family:{productInfo.color}, Size:
                {productInfo.size}
              </p>
              {productInfo.stockLeft <= 1 && (
                <p className="text-red-500 text-xs font-medium pt-1">
                  Only {product.stock} item(s) in stock
                </p>
              )}
            </div>

            {/* Price & Quantity Blocks */}
            <div className="flex justify-between md:justify-end md:gap-16 items-start pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
              <div className="space-y-0.5">
                <p className="text-orange-500 text-base font-medium">
                  Rs. {orderData.totalPrice}
                </p>
                <p className="text-xs text-gray-400 line-through">
                  Rs. {orderData.totalPrice}
                </p>
                <p className="text-xs text-gray-700">{productInfo.discount}</p>
              </div>

              <div className="text-sm text-gray-800">
                <span className="text-gray-400 text-xs">Qty:</span>{" "}
                {productInfo.quantity}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
