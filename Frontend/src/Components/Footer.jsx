import React from "react";
import { TbBrandAppgallery } from "react-icons/tb";

import { FaApple, FaGoogle } from "react-icons/fa";

export const Footer = () => {
  const customerCareLinks = [
    "Help Center",
    "How to Buy",
    "Corporate & Bulk Purchasing",
    "Returns & Refunds",
    "Contact Us",
    "Purchase Protection",
    "Daraz Pick up Points",
  ];

  const darazLinks = [
    "About Us",
    "Digital Payments",
    "Daraz Donates",
    "Daraz Blog",
    "Terms & Conditions",
    "Privacy Policy",
    "NTN Number : 4012118-6",
    "STRN Number : 1700401211818",
    "Online Shopping App",
    "Online Grocery Shopping",
    "Daraz Exclusive",
    "Daraz University",
    "Sell on Daraz",
    "Join Daraz Affiliate Program",
  ];

  return (
    <footer className="bg-[#F4F4F6] text-[#0F136D] py-10 px-4 md:px-12 font-sans border-t border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 1. Customer Care Column */}
        <div>
          <h3 className="text-base font-semibold mb-3 text-[#0F136D]">
            Customer Care
          </h3>
          <ul className="space-y-1.5 text-xs text-[#212121]">
            {customerCareLinks.map((link, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="hover:underline font-semibold hover:text-[#F57224]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Daraz Column */}
        <div>
          <h3 className="text-base font-semibold mb-3 text-[#0F136D]">Daraz</h3>
          <ul className="space-y-1.5 text-xs text-[#212121]">
            {darazLinks.map((link, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="hover:underline font-semibold hover:text-[#F57224]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Logo & App Promo Column */}
        <div className="flex items-start gap-3">
          {/* Daraz App Icon Logo */}
          <div className="w-12 h-12 bg-[#F57224] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md shrink-0">
            d
          </div>
          <div>
            <h4 className="text-base font-medium text-[#F57224] leading-tight">
              Happy Shopping
            </h4>
            <p className="text-sm font-normal text-[#0F136D]">Download App</p>
          </div>
        </div>

        {/* 4. App Store Badges Column */}
        <div className="flex flex-col gap-2.5">
          {/* App Store Button */}
          <a
            href="#"
            className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 w-44 hover:opacity-90 transition-opacity"
          >
            <span className="text-xl">
              <FaApple />
            </span>
            <div className="text-left leading-none">
              <span className="text-[9px] uppercase block tracking-wider text-slate-300">
                Available on the
              </span>
              <span className="text-xs font-bold">App Store</span>
            </div>
          </a>

          {/* Google Play Button */}

          <a
            href="#"
            className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 w-44 hover:opacity-90 transition-opacity"
          >
            <span className="text-xl">
              <FaGoogle />
            </span>
            <div className="text-left leading-none">
              <span className="text-[8px] uppercase block tracking-wider text-slate-300">
                ANDROID APP ON
              </span>
              <span className="text-xs font-bold">Google play</span>
            </div>
          </a>

          {/* AppGallery Button */}
          <a
            href="#"
            className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 w-44 hover:opacity-90 transition-opacity"
          >
            <span className="text-xl text-rose-500">
              <TbBrandAppgallery />
            </span>
            <div className="text-left leading-none">
              <span className="text-[8px] uppercase block tracking-wider text-slate-300">
                EXPLORE IT ON
              </span>
              <span className="text-xs font-bold">AppGallery</span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
