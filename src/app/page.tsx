import Link from "next/link";
import productsData from "@/data/products.json";
import { Sun, Star, Flame, Sparkles, Droplet, Shield, Heart, ArrowRight, Truck } from "lucide-react";

export default function Home() {
  // Grab first 3 products for the Popular Products section
  const popularProducts = productsData.slice(0, 3);

  const careTips = [
    {
      title: "Keep Hydrated Always",
      description: "Drink at least 3 liters of water daily. Carry an insulated stainless steel bottle to keep your water ice-cold on hot days.",
      icon: <Droplet className="h-7 w-7 text-sky-500" />,
      tag: "Hydration",
      bgColor: "bg-sky-50",
    },
    {
      title: "Apply SPF Every 2 Hours",
      description: "Use a broad-spectrum sunscreen with SPF 50 or higher. Apply 15 minutes before heading out and reapply regularly.",
      icon: <Shield className="h-7 w-7 text-amber-500" />,
      tag: "Protection",
      bgColor: "bg-amber-50",
    },
    {
      title: "Wear UV Protection",
      description: "Protect your eyes and face. Choose sunglasses with UV400 blocking and wide-brim woven straw hats for sun protection.",
      icon: <Sun className="h-7 w-7 text-orange-500" />,
      tag: "Style & Safety",
      bgColor: "bg-orange-50",
    },
  ];

  const topBrands = [
    { name: "SunShade", description: "Premium UV eyewear", est: "Est. 2018", color: "from-amber-400 to-orange-500" },
    { name: "BreezeFit", description: "Linen summer apparel", est: "Est. 2015", color: "from-orange-400 to-red-500" },
    { name: "SolGuard", description: "Organic skin protection", est: "Est. 2020", color: "from-cyan-400 to-blue-500" },
    { name: "HydroFlow", description: "Insulated hydration gear", est: "Est. 2019", color: "from-teal-400 to-emerald-500" },
  ];

  return (
    <div className="flex flex-col w-full pb-16 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-100 via-orange-50 to-sky-100 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-orange-100">
        {/* Decorative Spheres */}
        <div className="absolute top-1/2 left-5 w-48 h-48 bg-amber-300 rounded-full filter blur-3xl opacity-20 -translate-y-1/2"></div>
        <div className="absolute bottom-5 right-5 w-72 h-72 bg-sky-300 rounded-full filter blur-3xl opacity-25"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left animate__animated animate__fadeInLeft">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-700 px-4.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Summer Essentials Sale
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Sun-Kissed Style, <br />
              <span className="text-gradient">
                Summer Perfection
              </span>
            </h1>
            <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
              Gear up for the season of sunshine! Discover our handpicked summer essentials—from UV block shades to soothing sunscreens. Refresh your summer wardrobe today.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="badge badge-lg bg-orange-500 text-white font-bold px-4 py-3 border-none flex gap-1 shadow-md shadow-orange-500/20">
                <Flame className="h-4.5 w-4.5" /> Hot Deals 🔥
              </div>
              <span className="font-extrabold text-stone-800 text-sm tracking-wide bg-white/80 px-4 py-2.5 rounded-xl border border-stone-200">
                SUMMER SALE 50% OFF
              </span>
            </div>

            <div className="flex flex-row items-center gap-4 mt-4 w-full sm:w-auto">
              <Link
                href="/products"
                className="btn bg-amber-500 hover:bg-amber-600 border-none text-white rounded-2xl font-bold px-8 py-3.5 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                Shop Collection
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Hero Right Banner Image */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-8 animate__animated animate__fadeInRight">
            {/* Glowing Background Radial */}
            <div className="absolute w-72 h-72 bg-amber-400/30 rounded-full filter blur-3xl animate-pulse-slow"></div>

            {/* Rotating Sun Ring */}
            <div className="absolute -top-4 -right-4 w-28 h-28 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full opacity-20 filter blur-sm animate-spin-slow"></div>

            {/* Floating Badges */}
            {/* Badge 1: Top Left */}
            <div className="absolute top-10 -left-6 z-20 glass-card rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2.5 border border-white/60 animate-float-delayed">
              <span className="p-1.5 bg-amber-500 rounded-lg text-white font-bold text-xs">50%</span>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-stone-400 font-bold uppercase leading-none">Mega Sale</span>
                <span className="text-xs font-black text-stone-800 mt-1">Summer Deal</span>
              </div>
            </div>

            {/* Badge 2: Bottom Right */}
            <div className="absolute bottom-12 -right-4 z-20 glass-card rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2.5 border border-white/60 animate-float">
              <span className="p-1.5 bg-sky-500 rounded-lg text-white">
                <Truck className="h-4 w-4" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-stone-400 font-bold uppercase leading-none">Shipping</span>
                <span className="text-xs font-black text-stone-800 mt-1">Free & Fast</span>
              </div>
            </div>

            {/* Main Floating Image Container */}
            <div className="relative w-full max-w-sm aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/80 animate-float">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                alt="Beautiful Summer Beach Essentials"
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8">
                <p className="text-white text-xl sm:text-2xl font-black">Escape to Paradise</p>
                <p className="text-amber-300 text-xs sm:text-sm font-semibold mt-1">Get up to 50% off beach gear & shades</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left">
            <h2 className="text-3xl font-black text-stone-800 tracking-tight">Popular Products</h2>
            <p className="text-stone-500 mt-2 text-sm">
              Trending items our customers are loving right now
            </p>
          </div>
          <Link
            href="/products"
            className="group mt-4 md:mt-0 text-amber-500 hover:text-amber-600 font-bold flex items-center gap-1.5 text-sm transition-colors"
          >
            Explore all products
            <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="card bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-stone-100 hover:border-amber-100 overflow-hidden flex flex-col h-full group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-stone-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge bg-amber-500 text-white font-bold border-none text-xs px-3.5 py-2.5 rounded-xl shadow-md shadow-amber-500/10">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6 flex flex-col flex-grow text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4.5 w-4.5 fill-current" />
                    <span className="text-sm font-bold text-stone-700">{product.rating}</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-stone-800 text-lg line-clamp-1 mb-2 group-hover:text-amber-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Footer info */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-50">
                  <span className="text-2xl font-black text-stone-800">
                    ${product.price}
                  </span>
                  <Link
                    href={`/products/${product.id}`}
                    className="btn btn-sm bg-stone-900 hover:bg-amber-500 text-white border-none rounded-xl font-bold px-4 py-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Extra Section 1: Summer Care Tips */}
      <section className="bg-gradient-to-r from-amber-50/70 to-orange-50/70 border-y border-orange-100/50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-stone-800 tracking-tight">Summer Care Tips</h2>
            <p className="text-stone-500 mt-2 text-sm">
              Stay healthy, protected, and glowing under the summer sun with our expert guidelines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-stone-100 hover:border-amber-200 shadow-xl hover:shadow-2xl transition-all text-left flex flex-col gap-5 hover:translate-y-[-4px]"
              >
                <div className={`p-4 rounded-2xl w-fit ${tip.bgColor}`}>
                  {tip.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600">
                    {tip.tag}
                  </span>
                  <h3 className="text-xl font-extrabold text-stone-800">{tip.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed mt-1">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Extra Section 2: Top Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-stone-800 tracking-tight">Top Summer Brands</h2>
          <p className="text-stone-500 mt-2 text-sm">
            We collaborate with industry leaders to bring you high-quality summer products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topBrands.map((brand, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden shadow-lg p-7 text-left border border-stone-100 bg-white hover:border-amber-100 transition-all flex flex-col justify-between min-h-[160px] hover:shadow-xl"
            >
              {/* Colored Corner Flare */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${brand.color} opacity-10 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-500`}></div>
              
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-xs font-bold text-stone-400 tracking-widest uppercase">{brand.est}</span>
                <h3 className="text-2xl font-black text-stone-800 group-hover:text-amber-500 transition-colors">{brand.name}</h3>
                <p className="text-xs text-stone-500 leading-relaxed mt-1">{brand.description}</p>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase text-amber-500 tracking-wider mt-4">
                Explore Brand Products <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
