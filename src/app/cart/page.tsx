"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { authClient } from "@/lib/auth-client";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard, Send, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const { data: session } = authClient.useSession();
  const [isDispatching, setIsDispatching] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingCost = cartTotal >= 50 || cartTotal === 0 ? 0 : 5;
  const finalTotal = cartTotal + shippingCost;

  const handleCheckout = async () => {
    if (!session) {
      toast.error("Please login to complete your order.");
      router.push("/login?callbackUrl=/cart");
      return;
    }

    setIsDispatching(true);
    toast.loading("Dispatching order...", { id: "dispatch-order" });

    // Simulate database order placement and logistics dispatch
    setTimeout(() => {
      setIsDispatching(false);
      setOrderPlaced(true);
      clearCart();
      toast.success("Order Placed! Dispatched for packaging 📦", { id: "dispatch-order" });
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="flex-grow bg-stone-50/50 flex items-center justify-center py-20 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-100 shadow-2xl max-w-md w-full text-center animate__animated animate__zoomIn">
          <div className="p-4 bg-emerald-50 rounded-full w-fit mx-auto text-emerald-500 mb-6 animate__animated animate__bounceIn animate__delay-1s">
            <CheckCircle2 className="h-14 w-14" />
          </div>
          <h2 className="text-3xl font-black text-stone-800 tracking-tight">Order Dispatched!</h2>
          <p className="text-stone-500 text-sm mt-3 leading-relaxed">
            Thank you for shopping with SunCart. Your summer essentials have been successfully ordered and dispatched to our logistics center for immediate packaging.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/products"
              className="btn bg-amber-500 hover:bg-amber-600 border-none text-white rounded-2xl font-bold py-3.5 w-full shadow-lg shadow-amber-500/20"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="btn btn-ghost text-stone-600 hover:bg-stone-50 rounded-2xl font-bold py-3.5 w-full"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-stone-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Back Link */}
        <div className="text-left animate__animated animate__fadeIn">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-500 font-semibold transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-4xl font-black text-stone-800 tracking-tight text-left flex items-center gap-2.5">
          <ShoppingBag className="h-8 w-8 text-amber-500" />
          Your Shopping Cart
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4 animate__animated animate__fadeInLeft">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-100 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left hover:border-amber-100 transition-all"
                >
                  {/* Left: Product Info */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1.5">
                        {item.product.brand}
                      </span>
                      <h3 className="font-extrabold text-stone-800 text-base truncate max-w-[200px] sm:max-w-[300px]">
                        {item.product.name}
                      </h3>
                      <span className="text-sm font-black text-amber-600 mt-1">
                        ${item.product.price}
                      </span>
                    </div>
                  </div>

                  {/* Right: Quantity and Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                    {/* Quantity selectors */}
                    <div className="flex items-center gap-3 bg-stone-50 px-3 py-1.5 rounded-2xl border border-stone-100">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:text-amber-500 transition-colors text-stone-400 bg-transparent border-none cursor-pointer"
                        aria-label="Decrease Quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-extrabold text-stone-700 text-sm min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:text-amber-500 transition-colors text-stone-400 bg-transparent border-none cursor-pointer"
                        aria-label="Increase Quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Price and Trash */}
                    <div className="flex items-center gap-4">
                      <span className="font-black text-stone-800 text-base min-w-[70px] text-right">
                        ${item.product.price * item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="btn btn-ghost btn-circle btn-sm text-red-500 hover:bg-red-50"
                        aria-label="Remove Item"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared.");
                  }}
                  className="btn btn-ghost text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-2xl font-bold btn-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 animate__animated animate__fadeInRight">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-2xl flex flex-col gap-6 text-left">
                <h2 className="text-xl font-black text-stone-800">Order Summary</h2>

                <div className="space-y-3.5 border-b border-stone-100 pb-5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-500 font-medium">Subtotal ({cartCount} items)</span>
                    <span className="font-bold text-stone-700">${cartTotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-500 font-medium">Shipping Fee</span>
                    <span className={`font-bold ${shippingCost === 0 ? "text-emerald-600" : "text-stone-700"}`}>
                      {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                    </span>
                  </div>
                  {shippingCost > 0 && (
                    <div className="bg-amber-50 text-amber-800 p-2.5 rounded-xl text-[10px] font-semibold leading-relaxed">
                      💡 Tip: Add **${50 - cartTotal}** more to get **FREE Shipping**!
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-stone-800 text-base">Total Sum</span>
                  <span className="font-black text-stone-900 text-2xl">${finalTotal}</span>
                </div>

                {/* Dispatch Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isDispatching}
                  className="btn w-full bg-amber-500 hover:bg-amber-600 border-none text-white rounded-2xl font-bold py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:bg-amber-300"
                >
                  {isDispatching ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <Send className="h-4.5 w-4.5" />
                      Place Order & Dispatch
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2.5 justify-center text-[10px] font-semibold text-stone-400">
                  <CreditCard className="h-4 w-4" />
                  Secure Transaction • Free Returns
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-100 shadow-xl p-16 text-center max-w-lg mx-auto w-full animate__animated animate__fadeIn">
            <div className="p-4 bg-amber-50 rounded-full w-fit mx-auto text-amber-500 mb-6">
              <ShoppingBag className="h-10 w-10 animate-pulse" />
            </div>
            <h3 className="text-xl font-black text-stone-800">Your Cart is Empty</h3>
            <p className="text-stone-500 text-sm mt-2 leading-relaxed">
              Looks like you haven&apos;t added any summer essentials to your shopping cart yet. Let&apos;s go explore!
            </p>
            <Link
              href="/products"
              className="btn bg-amber-500 hover:bg-amber-600 border-none text-white rounded-2xl font-bold px-8 py-3.5 mt-6 shadow-md shadow-amber-500/20 inline-flex items-center gap-2"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
