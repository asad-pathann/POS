import React from "react";

// --- 1. PREMIUM HERO CAROUSEL ---
export const Hero = () => (
  <section className="my-4 relative rounded-[2rem] overflow-hidden bg-slate-950 aspect-[16/9] md:aspect-[21/8] shadow-md border border-slate-100">
    <img
      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80"
      alt="Winter Wear Mega Fest"
      className="absolute inset-0 w-full h-full object-cover opacity-65 object-center"
    />
    <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-center text-white space-y-2.5 bg-gradient-to-r from-black/80 via-black/20 to-transparent">
      <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-lg w-fit border border-blue-800/30">
        WINTER FEST • 50% OFF
      </span>
      <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-none max-w-xs md:max-w-lg">
        Curated Seasonal <br />
        Collection
      </h1>
      <p className="text-[11px] text-slate-300 max-w-[240px] md:max-w-md line-clamp-2 font-medium">
        Upgrade your wardrobe with premium jackets, cozy streetwear, and tech
        accessories.
      </p>
      <button className="bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold w-fit px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95 mt-2">
        Shop Now
      </button>
    </div>
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
      <span className="w-3.5 h-1.5 bg-white rounded-full transition-all"></span>
      <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
      <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
    </div>
  </section>
);

// --- 2. CATEGORIES (Trendy Full Cover Overlay Grid) ---
export const Categories = () => {
  const cats = [
    {
      label: "Electronics",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=70",
    },
    {
      label: "Men's Fashion",
      img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&auto=format&fit=crop&q=70",
    },
    {
      label: "Women's Wear",
      img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&auto=format&fit=crop&q=70",
    },
    {
      label: "Home Decor",
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=70",
    },
    {
      label: "Gadgets",
      img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=70",
    },
    {
      label: "Sports Gear",
      img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&auto=format&fit=crop&q=70",
    },
  ];

  return (
    <section className="mb-6">
      <h2 className="text-base font-black text-slate-900 mb-3 tracking-tight uppercase">
        Categories
      </h2>
      <div className="grid grid-cols-3 gap-2.5">
        {cats.map((c) => (
          <div
            key={c.label}
            className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm cursor-pointer border border-slate-100"
          >
            <img
              src={c.img}
              alt={c.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-2.5">
              <span className="text-[11px] font-bold text-white tracking-tight leading-tight">
                {c.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 3. FLASH SALE (Sleek Horizontal Slider) ---
export const DailyDeals = () => {
  const flashProducts = [
    {
      id: 1,
      title: "TWS Wireless Earbuds Pro",
      price: 1.99,
      originalPrice: 360,
      left: 15,
      img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=70",
    },
    {
      id: 2,
      title: "Minimalist Leather Smartwatch",
      price: 12.5,
      originalPrice: 450,
      left: 4,
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=70",
    },
    {
      id: 3,
      title: "Fast Charging PD Adapter 65W",
      price: 3.99,
      originalPrice: 120,
      left: 22,
      img: "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=300&auto=format&fit=crop&q=70",
    },
  ];

  return (
    <section className="mb-6 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-3.5">
        <h2 className="text-base font-black text-slate-900 tracking-tight">
          FLASH SALE 🔥
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Ends In:
          </span>
          <div className="flex gap-1 text-xs font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">
            <span>12</span>:<span>45</span>:<span>08</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none snap-x">
        {flashProducts.map((p) => (
          <div
            key={p.id}
            className="min-w-[135px] w-[135px] flex flex-col snap-start bg-white rounded-2xl overflow-hidden"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border border-slate-100 mb-2 relative">
              <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-md z-10 uppercase tracking-wide shadow-sm">
                50% OFF
              </span>
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-1 flex flex-col gap-0.5">
              <h3 className="text-[11px] font-bold text-slate-800 line-clamp-1 leading-tight">
                {p.title}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-black text-slate-900">
                  ${p.price}
                </span>
                <span className="text-[9px] text-slate-400 line-through font-medium">
                  ${p.originalPrice}
                </span>
              </div>
              <div className="mt-1">
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{ width: `${(p.left / 30) * 100}%` }}
                  ></div>
                </div>
                <span className="text-[8px] text-red-500 font-extrabold mt-0.5 block uppercase tracking-tight">
                  ONLY {p.left} LEFT!
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 4. JUST FOR YOU (Advanced Grid Architecture) ---
export const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      category: "Women's Clothing",
      title: "Premium Oversized Blazer Suit Jacket",
      description: "Soft touch luxury formal blazer with structured shoulders.",
      price: 45.0,
      rating: "4.9",
      reviews: 142,
      location: "Lahore",
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 2,
      category: "Tech Gear",
      title: "Mechanical Backlit Ergonomic Keyboard",
      description: "Tactile brown switches with customizable RGB layout.",
      price: 89.99,
      rating: "4.8",
      reviews: 98,
      location: "Karachi",
      img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 3,
      category: "Footwear",
      title: "Urban Retro Court Sneakers 2.0",
      description: "Genuine breathable leather sneakers for everyday comfort.",
      price: 65.0,
      rating: "4.7",
      reviews: 210,
      location: "Islamabad",
      img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=70",
    },
    {
      id: 4,
      category: "Smart Living",
      title: "Nordic Ceramic Indoor Plant Pot",
      description: "Minimalist geometric drainage planter for modern setups.",
      price: 14.5,
      rating: "5.0",
      reviews: 45,
      location: "Faisalabad",
      img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop&q=70",
    },
  ];

  return (
    <section className="mb-24">
      <div className="mb-3.5">
        <h2 className="text-base font-black text-slate-900 tracking-tight uppercase">
          JUST FOR YOU
        </h2>
        <p className="text-[10px] text-slate-400 font-bold tracking-wide uppercase">
          Based on your activity
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
              <span className="absolute top-2 left-2 bg-slate-950 text-white text-[8px] font-black px-2 py-0.5 rounded-md z-10 tracking-wider uppercase">
                50% OFF
              </span>
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Meta Details */}
            <div className="p-3 flex flex-col flex-1 justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-600 block">
                  {p.category}
                </span>
                <h3 className="text-xs font-black text-slate-800 line-clamp-1 tracking-tight leading-tight">
                  {p.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium line-clamp-1 leading-snug">
                  {p.description}
                </p>

                <div className="pt-1 flex items-baseline gap-1">
                  <span className="text-sm font-black text-slate-950">
                    ${p.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-2.5 space-y-2">
                {/* Rating & Location Tag */}
                <div className="flex items-center justify-between text-[9px] font-bold text-slate-500">
                  <div className="flex items-center gap-0.5">
                    <span className="text-amber-500 text-xs">★</span>
                    <span className="text-slate-800 mt-0.5">{p.rating}</span>
                    <span className="text-slate-300 font-normal">
                      ({p.reviews})
                    </span>
                  </div>
                  <span className="bg-slate-50 px-1.5 py-0.5 rounded text-slate-400 font-semibold">
                    {p.location}
                  </span>
                </div>

                <button className="w-full bg-slate-950 hover:bg-slate-800 text-white text-[11px] font-bold py-2 rounded-xl transition-all shadow-sm active:scale-[0.97]">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 5. FLOATING CENTER BOTTOM NAVIGATION ---
export const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-2 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(15,23,42,0.06)]">
    <div className="flex w-2/5 justify-around">
      <BottomNavItem icon="🏠" label="Home" active />
      <BottomNavItem icon="🧭" label="Discover" />
    </div>

    <div className="relative -mt-8 flex flex-col items-center">
      <div className="bg-slate-950 hover:bg-slate-800 w-11 h-11 rounded-full flex items-center justify-center text-white text-lg border-4 border-white shadow-lg shadow-slate-950/20 transition-transform cursor-pointer active:scale-90">
        ＋
      </div>
      <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 mt-1">
        Sell
      </span>
    </div>

    <div className="flex w-2/5 justify-around">
      <BottomNavItem icon="📋" label="Orders" />
      <BottomNavItem icon="👤" label="Profile" />
    </div>
  </nav>
);

const BottomNavItem = ({ icon, label, active }) => (
  <div
    className={`flex flex-col items-center gap-0.5 cursor-pointer min-w-[50px] ${active ? "text-slate-950" : "text-slate-400"}`}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-[9px] font-extrabold uppercase tracking-tight">
      {label}
    </span>
  </div>
);
