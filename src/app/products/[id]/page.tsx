"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import productsData from "@/data/products.json";
import { Star, ArrowLeft, ShieldCheck, Truck, RefreshCw, ShoppingCart, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const productId = parseInt(resolvedParams.id);
  const product = productsData.find((p) => p.id === productId);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please sign in to access product details.");
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [session, isPending, pathname, router]);

  if (isPending || !session) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
        <p className="text-stone-500 text-sm mt-4 font-semibold animate-pulse">
          Securing session & loading details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-2xl font-black text-stone-800">Product Not Found</h2>
        <p className="text-stone-500 mt-2 text-sm max-w-sm">
          The product you are trying to view does not exist or has been removed from our collection.
        </p>
        <button
          onClick={() => router.push("/products")}
          className="btn bg-amber-500 hover:bg-amber-600 border-none text-white rounded-2xl font-bold px-6 py-2.5 mt-6"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="flex-grow bg-stone-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Back Link */}
        <div className="text-left animate__animated animate__fadeIn">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-500 font-semibold transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to products
          </Link>
        </div>

        {/* Product Details Card */}
        <div className="bg-white rounded-3xl border border-stone-100 shadow-2xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14 animate__animated animate__fadeInUp">
          {/* Product Image Column */}
          <div className="md:col-span-6 flex justify-center items-center">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-stone-50">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="badge bg-amber-500 text-white font-extrabold border-none text-xs px-3.5 py-2.5 rounded-xl">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Product Information Column */}
          <div className="md:col-span-6 flex flex-col justify-between text-left gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                {product.brand}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-stone-800 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating and Stock */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-lg border border-amber-200">
                  <Star className="h-4 w-4 fill-current text-amber-500" />
                  <span className="text-sm font-bold">{product.rating} / 5.0</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-500 text-sm">
                  <span className="font-semibold text-stone-700">Stock Available:</span>
                  <span className={`font-bold ${product.stock > 5 ? "text-emerald-600" : "text-orange-500"}`}>
                    {product.stock} units
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-3xl font-black text-stone-800 py-2 border-y border-stone-100 mt-2">
                ${product.price}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5 mt-2">
                <h3 className="font-bold text-stone-700 text-sm">Product Description</h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="btn w-full bg-amber-500 hover:bg-amber-600 border-none text-white rounded-2xl font-bold py-3.5 flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              {/* Summer Guarantee items */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-stone-400 font-semibold mt-4 text-center">
                <div className="flex flex-col items-center gap-1 p-2 bg-stone-50 rounded-xl">
                  <Truck className="h-4.5 w-4.5 text-stone-400" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-stone-50 rounded-xl">
                  <RefreshCw className="h-4.5 w-4.5 text-stone-400" />
                  <span>Easy Return</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-stone-50 rounded-xl">
                  <ShieldCheck className="h-4.5 w-4.5 text-stone-400" />
                  <span>Secure Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
