"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function useCart() {
  return useContext(CartContext);
}

export function Providers({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(dish) {
    setCart((currentCart) => [...currentCart, dish]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
