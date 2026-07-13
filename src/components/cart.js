import React, { createContext, useState, useEffect } from 'react';

export const Cart = createContext();

export const MyCart = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
  
  return (
    <Cart.Provider value={{ cart, setCart }}>
      {children}
    </Cart.Provider>
  );
};
