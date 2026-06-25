"use client";

import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "font-semibold text-sm",
          success: {
            duration: 4000,
            style: {
              background: "#ecfdf5",
              color: "#065f46",
              border: "1px solid #a7f3d0",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fca5a5",
            },
          },
        }}
      />
      {children}
    </CartProvider>
  );
}
