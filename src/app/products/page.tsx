"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import productsData from "@/data/products.json";
import { Star, Search, SlidersHorizontal, Sun, ShoppingBag } from "lucide-react";

export default function ProductsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get all unique categories
  const categories = useMemo(() => {
    const list = new Set(productsData.map((p) => p.category));
    return ["All", ...Array.from(list)];
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex-grow bg-stone-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Page Title & Header */}
        <div className="text-left max-w-xl animate__animated animate__fadeIn">
          <h1 className="text-4xl font-black text-stone-800 tracking-tight flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-amber-500" />
            Summer Collection
          </h1>
          <p className="text-stone-500 mt-2 text-sm">
            Browse through our premium selection of summer products carefully curated for sun-kissed enjoyment.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-stone-100 shadow-xl shadow-stone-100/50 animate__animated animate__fadeIn">
          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search products or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-amber-500 bg-stone-50"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <SlidersHorizontal className="h-4.5 w-4.5 text-stone-400 shrink-0 hidden sm:inline" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm rounded-xl font-bold border-none transition-all px-4 py-2 shrink-0 ${
                  selectedCategory === category
                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="card bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-stone-100 hover:border-amber-100 overflow-hidden flex flex-col h-full group animate__animated animate__fadeInUp"
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
        ) : (
          <div className="bg-white rounded-3xl border border-stone-100 shadow-xl p-16 text-center max-w-lg mx-auto w-full animate__animated animate__fadeIn">
            <div className="p-4 bg-amber-50 rounded-full w-fit mx-auto text-amber-500 mb-6">
              <Sun className="h-10 w-10 animate-spin-slow" />
            </div>
            <h3 className="text-xl font-black text-stone-800">No Products Found</h3>
            <p className="text-stone-500 text-sm mt-2 leading-relaxed">
              We couldn&apos;t find any products matching your search term or selected category. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="btn bg-amber-500 hover:bg-amber-600 border-none text-white rounded-2xl font-bold px-6 py-2.5 mt-6 shadow-md shadow-amber-500/20"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
