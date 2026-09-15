import React from "react";
import {
  FaLeaf,
  FaFlask,
  FaHeart,
  FaAward,
  FaShippingFast,
  FaUndo,
  FaShieldAlt,
  FaHeadset,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Beauty Products" },
    { number: "50+", label: "Top Brands" },
    { number: "4.9★", label: "Average Rating" },
  ];

  const values = [
    {
      icon: <FaLeaf size={20} />,
      title: "100% Natural",
      desc: "Cruelty-free aur paraben-free, skin-friendly ingredients.",
    },
    {
      icon: <FaFlask size={20} />,
      title: "Dermatologist Tested",
      desc: "Certified dermatologists se tested — safe aur effective.",
    },
    {
      icon: <FaHeart size={20} />,
      title: "Made With Love",
      desc: "Har product pyaar se, detail se packaging tak.",
    },
    {
      icon: <FaAward size={20} />,
      title: "Premium Quality",
      desc: "Sirf authentic products — koi compromise nahi.",
    },
  ];

  const services = [
    {
      icon: <FaShippingFast size={16} />,
      title: "Free Delivery",
      desc: "Rs. 1500+ par",
    },
    { icon: <FaUndo size={16} />, title: "Easy Returns", desc: "7-din policy" },
    {
      icon: <FaShieldAlt size={16} />,
      title: "Secure Payment",
      desc: "100% protected",
    },
    {
      icon: <FaHeadset size={16} />,
      title: "24/7 Support",
      desc: "Hamesha saath",
    },
  ];

  const team = [
    {
      name: "Ayesha Khan",
      role: "Founder & CEO",
      img: "https://ui-avatars.com/api/?name=Ayesha+Khan&background=f57224&color=fff&size=200",
    },
    {
      name: "Bilal Ahmed",
      role: "Head of Products",
      img: "https://ui-avatars.com/api/?name=Bilal+Ahmed&background=1e293b&color=fff&size=200",
    },
    {
      name: "Sara Malik",
      role: "Beauty Expert",
      img: "https://ui-avatars.com/api/?name=Sara+Malik&background=f57224&color=fff&size=200",
    },
    {
      name: "Hassan Raza",
      role: "Customer Success",
      img: "https://ui-avatars.com/api/?name=Hassan+Raza&background=1e293b&color=fff&size=200",
    },
  ];

  return (
    <div className="bg-[#fafafa]">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute top-0 -left-20 w-72 h-72 bg-[#f57224]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="text-center md:text-left">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#f57224]">
              — About Us —
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              Beauty That <br />
              <span className="text-[#f57224]">Speaks For You</span>
            </h1>
            <p className="mt-4 text-gray-500 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
              Luxury Marketplace laata hai Pakistan ke premium aur authentic
              cosmetic products — skincare, makeup, haircare aur fragrance.
              Mission:{" "}
              <b className="text-gray-700">quality beauty for everyone</b>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#f57224] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#e0651c] hover:shadow-lg transition-all"
              >
                Shop Now <FaArrowRight size={11} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-gray-900 text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-900 hover:text-white transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-[#f57224] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-15 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
                alt="Cosmetics"
                className="relative w-full h-full object-cover rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-xl"
              />
              <div className="absolute -bottom-3 -left-3 bg-white px-4 py-2.5 rounded-xl shadow-lg border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                  Trusted by
                </p>
                <p className="text-base font-black text-gray-900">
                  10,000+ <span className="text-[#f57224]">Women</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl md:text-2xl font-black text-[#f57224]">
                {s.number}
              </p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <span className="text-[10px] font-extrabold text-[#f57224] uppercase tracking-[0.25em]">
            Our Promise
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">
            Why Choose <span className="text-[#f57224]">Us</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#f57224]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#fff5ed] text-[#f57224] flex items-center justify-center group-hover:bg-[#f57224] group-hover:text-white transition-all">
                {v.icon}
              </div>
              <h3 className="text-sm font-black text-gray-900 mt-3.5">
                {v.title}
              </h3>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-1.5">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES STRIP ===== */}
      <section className="bg-[#1e293b] py-6 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {services.map((s) => (
            <div key={s.title} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#f57224] text-white flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-[11px] font-black text-white leading-tight">
                  {s.title}
                </p>
                <p className="text-[9px] text-gray-400 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image grid */}
          <div className="grid grid-cols-2 gap-3">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"
              className="rounded-xl h-48 w-full object-cover shadow-md"
              alt="Cosmetic 1"
            />
            <img
              src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400"
              className="rounded-xl h-48 w-full object-cover shadow-md mt-6"
              alt="Cosmetic 2"
            />
            <img
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400"
              className="rounded-xl h-48 w-full object-cover shadow-md -mt-6"
              alt="Cosmetic 3"
            />
            <img
              src="https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=400"
              className="rounded-xl h-48 w-full object-cover shadow-md"
              alt="Cosmetic 4"
            />
          </div>

          {/* Content */}
          <div>
            <span className="text-[10px] font-extrabold text-[#f57224] uppercase tracking-[0.25em]">
              Our Story
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 leading-tight">
              Ek Chhoti Si <br />
              <span className="text-[#f57224]">Dream Se Shuru</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mt-4">
              2019 me humne ek simple soch ke saath shuru kiya — Pakistan ki
              auratein bhi deserve karti hain world-class beauty products, bina
              kisi compromise ke. Aaj 500+ premium products aur 10,000+ khush
              customers.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mt-3">
              Hum sirf products nahi bechte — hum aapki confidence, glow aur
              self-love ka hissa bante hain. Har order ke saath promise:{" "}
              <b className="text-gray-700">authentic, safe, aur premium.</b>
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 pt-5 border-t border-gray-200">
              <div className="border-l-2 border-[#f57224] pl-3">
                <p className="text-xl font-black text-gray-900">2019</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                  Founded
                </p>
              </div>
              <div className="border-l-2 border-[#f57224] pl-3">
                <p className="text-xl font-black text-gray-900">50+</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                  Partner Brands
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] font-extrabold text-[#f57224] uppercase tracking-[0.25em]">
              Meet The Team
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">
              The Faces Behind <span className="text-[#f57224]">The Glow</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((m) => (
              <div key={m.name} className="group text-center">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-3">
                    <div className="flex gap-1.5">
                      <a className="w-7 h-7 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-[#f57224] hover:text-white transition cursor-pointer">
                        <FaInstagram size={11} />
                      </a>
                      <a className="w-7 h-7 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-[#f57224] hover:text-white transition cursor-pointer">
                        <FaFacebookF size={11} />
                      </a>
                      <a className="w-7 h-7 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-[#f57224] hover:text-white transition cursor-pointer">
                        <FaTwitter size={11} />
                      </a>
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-black text-gray-900 mt-3">
                  {m.name}
                </h4>
                <p className="text-[10px] font-bold text-[#f57224] uppercase tracking-wider mt-0.5">
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-6 pb-14">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f57224] to-[#e0651c] px-8 py-12 text-center">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full"></div>

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Ready To Glow Up? ✨
            </h2>
            <p className="text-white/85 text-sm mt-2 max-w-md mx-auto">
              Aaj hi apni beauty routine upgrade karein — premium cosmetics,
              authentic products, unbeatable prices.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-[#f57224] px-6 py-2.5 rounded-full text-sm font-black hover:bg-gray-900 hover:text-white transition-all shadow-lg mt-5"
            >
              Start Shopping <FaArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
