"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("suncart_cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("suncart_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          toast.error(`Cannot add more. Only ${product.stock} units in stock.`);
          return prevItems;
        }
        toast.success(`Updated quantity for ${product.name}!`);
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }

      if (quantity > product.stock) {
        toast.error(`Cannot add. Only ${product.stock} units in stock.`);
        return prevItems;
      }

      toast.success(`${product.name} added to cart!`);
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.product.id === productId);
      if (item) {
        toast.success(`${item.product.name} removed from cart.`);
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.product.id === productId);
      if (item && quantity > item.product.stock) {
        toast.error(`Only ${item.product.stock} units in stock.`);
        return prevItems;
      }
      return prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
