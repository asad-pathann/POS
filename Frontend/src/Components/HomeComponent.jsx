import React from "react";

// --- 1. MINIMAL MODERN HERO BANNER ---
export const Hero = () => (
  <section className="my-4 relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-950 aspect-[16/9] md:aspect-[21/8] shadow-sm border border-emerald-800/20">
    <div className="absolute inset-0 opacity-40 mix-blend-overlay">
      <img
        src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1200&auto=format&fit=crop&q=80"
        alt="Fresh Supermarket Grocery"
        className="w-full h-full object-cover object-center"
      />
    </div>
    <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-center text-white space-y-3 z-10">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-900/60 px-3 py-1 rounded-full w-fit border border-emerald-500/30 backdrop-blur-sm">
        Premium Quality • Wholesale Save
      </span>
      <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-tight max-w-xs md:max-w-xl">
        Fresh Daily Staples <br />
        Delivered To Your Door
      </h1>
      <p className="text-[11px] text-emerald-200/80 max-w-[250px] md:max-w-md font-medium leading-relaxed">
        Premium farm-fresh pulses, unadulterated oils, and handpicked cooking
        essentials at unbeatable prices.
      </p>
      <button className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold w-fit px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-950/40 active:scale-95 mt-2">
        Shop Fresh Goods
      </button>
    </div>
  </section>
);

// --- 2. CLEAN ROUNDED CATEGORIES CIRLCES ---
export const Categories = () => {
  const cats = [
    {
      label: "Grains & Rice",
      img: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=200&auto=format&fit=crop&q=70",
    },
    {
      label: "Oil & Ghee",
      img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&auto=format&fit=crop&q=70",
    },
    {
      label: "Tea & Beverages",
      img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200&auto=format&fit=crop&q=70",
    },
    {
      label: "Home Cleaning",
      img: "https://images.unsplash.com/photo-1585060544812-6b4590345ddc?w=200&auto=format&fit=crop&q=70",
    },
    {
      label: "Spices & Herbs",
      img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&auto=format&fit=crop&q=70",
    },
    {
      label: "Dairy Products",
      img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=70",
    },
  ];

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">
          Browse Categories
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
        {cats.map((c) => (
          <div
            key={c.label}
            className="flex flex-col items-center gap-2 min-w-[76px] snap-start cursor-pointer group"
          >
            <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-0.5 shadow-sm group-hover:border-emerald-500 transition-all duration-300">
              <img
                src={c.img}
                alt={c.label}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <span className="text-[10px] font-bold text-slate-700 text-center leading-tight max-w-[76px] line-clamp-2">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 3. PREMIUM FLASH DEALS CARD ---
export const DailyDeals = () => {
  const flashProducts = [
    {
      id: 1,
      title: "Premium Basmati Rice Long Grain",
      weight: "5 kg",
      price: 11.5,
      originalPrice: 15.0,
      left: 6,
      img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=70",
    },
    {
      id: 2,
      title: "Pure Refined Vegetable Cooking Oil",
      weight: "5 Litre",
      price: 18.0,
      originalPrice: 22.5,
      left: 3,
      img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=70",
    },
    {
      id: 3,
      title: "Organic Ground Hot Chili Spice",
      weight: "250 Grams",
      price: 2.99,
      originalPrice: 4.5,
      left: 12,
      img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&auto=format&fit=crop&q=70",
    },
  ];

  return (
    <section className="mb-8 bg-slate-50 p-4.5 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-base">⚡</span>
          <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">
            Limited Flash Savings
          </h2>
        </div>
        <div className="flex gap-1 text-[11px] font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
          <span>04h</span>:<span>15m</span>:<span>32s</span>
        </div>
      </div>

      <div className="flex gap-3.5 overflow-x-auto pb-1 scrollbar-none snap-x">
        {flashProducts.map((p) => (
          <div
            key={p.id}
            className="min-w-[145px] w-[145px] flex flex-col snap-start bg-white p-2 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 mb-2 relative">
              <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-md z-10">
                SAVE
              </span>
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-[11px] font-black text-slate-800 line-clamp-1 leading-tight">
                  {p.title}
                </h3>
                <span className="text-[9px] text-slate-400 font-bold block mb-1">
                  {p.weight}
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-black text-emerald-700">
                    ${p.price.toFixed(2)}
                  </span>
                  <span className="text-[9px] text-slate-400 line-through">
                    ${p.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="mt-1.5">
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${(p.left / 15) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[8px] text-emerald-600 font-extrabold mt-0.5 block">
                    {p.left} items left
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 4. LUXURY DENSE PRODUCT LIST GRID ---
export const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      category: "Pulses & Lentils",
      title: "Split Chickpea Premium Chana Dal",
      weight: "1 kg Pack",
      price: 2.1,
      stockStatus: "In Stock",
      img: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 2,
      category: "Tea & Infusions",
      title: "Strong Danedar Premium Black Leaf Tea",
      weight: "500g Pack",
      price: 4.5,
      stockStatus: "In Stock",
      img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 3,
      category: "Pantry Sugars",
      title: "Pure Refined White Granulated Sugar",
      weight: "1 kg Pack",
      price: 1.2,
      stockStatus: "In Stock",
      img: "https://images.unsplash.com/photo-1581447101795-7fd1b046822f?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 4,
      category: "Home Detergents",
      title: "Active Dishwash Lemon Fresh Soap Bar",
      weight: "3-in-1 Saver Pack",
      price: 0.8,
      stockStatus: "Low Stock",
      img: "https://images.unsplash.com/photo-1585060544812-6b4590345ddc?w=400&auto=format&fit=crop&q=70",
    },
  ];

  return (
    <section className="mb-24">
      <div className="mb-4">
        <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">
          Daily Staples Essentials
        </h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Curated wholesale rates
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        {products &&
          products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-500/20 hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative aspect-square w-full bg-slate-50 p-2">
                <span className="absolute top-2.5 left-2.5 bg-slate-900 text-white text-[8px] font-black px-2 py-0.5 rounded-lg z-10 tracking-wider">
                  BEST RATE
                </span>
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-black uppercase tracking-wider text-emerald-600">
                    {p.category}
                  </span>
                  <h3 className="text-xs font-black text-slate-800 line-clamp-1 leading-snug tracking-tight">
                    {p.title}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 block">
                    {p.weight}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-slate-900">
                      ${p.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md ${p.stockStatus === "In Stock" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {p.stockStatus}
                    </span>
                  </div>

                  <button className="w-full bg-slate-900 hover:bg-emerald-700 text-white text-[11px] font-bold py-2.5 rounded-xl transition-all shadow-sm active:scale-95 group-hover:bg-emerald-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

// --- 5. FIXED BOTTOM APP SHELF DOCK ---
export const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100/80 px-6 py-2.5 flex justify-between items-center z-50 shadow-[0_-8px_30px_rgba(15,23,42,0.04)]">
    <div className="flex w-2/5 justify-between">
      <BottomNavItem icon="🏪" label="Shop" active />
      <BottomNavItem icon="🔍" label="Search" />
    </div>

    <div className="relative -mt-10 flex flex-col items-center">
      <div className="bg-emerald-600 hover:bg-emerald-700 w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg border-4 border-white shadow-xl shadow-emerald-950/20 transition-transform cursor-pointer active:scale-90">
        🛒
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 mt-1">
        Cart
      </span>
    </div>

    <div className="flex w-2/5 justify-between">
      <BottomNavItem icon="📋" label="Orders" />
      <BottomNavItem icon="👤" label="Account" />
    </div>
  </nav>
);

const BottomNavItem = ({ icon, label, active }) => (
  <div
    className={`flex flex-col items-center gap-1 cursor-pointer min-w-[45px] transition-colors ${active ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"}`}
  >
    <span className="text-base">{icon}</span>
    <span className="text-[9px] font-black uppercase tracking-tight">
      {label}
    </span>
  </div>
);
