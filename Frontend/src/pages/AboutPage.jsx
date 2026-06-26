import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  const stats = [
    { value: "10K+", label: "Happy Households" },
    { value: "150+", label: "Wholesale Items" },
    { value: "100%", label: "Pure & Unadulterated" },
    { value: "24/7", label: "Smart POS Logistics" },
  ];

  const values = [
    {
      icon: "🌾",
      title: "Direct From Farms",
      desc: "We eliminate middlemen to bring you the highest grade agriculture directly from trusted sorting fields.",
    },
    {
      icon: "⚖️",
      title: "Honest Quantities",
      desc: "Strict weight measures and clear pricing transparency are embedded right into our digital POS pipeline.",
    },
    {
      icon: "🛡️",
      title: "Hygiene Certified",
      desc: "Every package undergoes double-layered micro-sanitization and dust-free moisture sealing before dispatch.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-6 pb-24 px-4 max-w-4xl mx-auto">
      <div className="max-w-3xl mx-start w-full -mt-3 pt-4 border-t border-slate-200 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-start gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg shadow-sm transition-all duration-200 group active:scale-95"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Wapas Jayein (Go Back)
        </button>
      </div>
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-emerald-900 to-teal-950 rounded-[2rem] p-6 md:p-10 text-white text-center border border-emerald-800/20 shadow-sm mb-8">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/20">
          Our Vision & Mission
        </span>
        <h1 className="text-2xl md:text-4xl font-black tracking-tight mt-3">
          Redefining Daily Provisions
        </h1>
        <p className="text-xs text-emerald-200/70 max-w-lg mx-auto mt-2 leading-relaxed">
          We are committed to delivering bulk commodities and household staples
          at standard wholesale margins directly to your doorstep.
        </p>
      </section>

      {/* Grid Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
        {stats.map((s, index) => (
          <div
            key={index}
            className="bg-white border border-slate-100 p-4 rounded-2xl text-center shadow-sm"
          >
            <div className="text-xl font-black text-emerald-700 font-mono">
              {s.value}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-tight">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* Corporate Story */}
      <section className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm mb-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 space-y-3">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">
            The Pure Staple Movement
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Founded with the sole ambition of bringing price stability back to
            the average family kitchen, our automated retail hub monitors and
            matches wholesale mill index pricing in real time.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            By avoiding expensive fancy retail display markups, we invest purely
            in supply chain cold storage to ensure your food arrives with
            preserved nutritional metrics.
          </p>
        </div>
        <div className="w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=400&auto=format&fit=crop&q=70"
            alt="Supermarket Supply Chain"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-3">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider px-1">
          Why Choose Our Store
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-2"
            >
              <span className="text-xl block">{v.icon}</span>
              <h3 className="text-xs font-black text-slate-800 tracking-tight">
                {v.title}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium leading-normal">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
