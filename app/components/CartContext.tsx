import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the shape of the context
interface CartContextData {
  cartItems: any[];
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
}

// Create the context
const CartContext = createContext<CartContextData | undefined>(undefined);

// Create the provider component
const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>(() => {
    // Get the cart items from local storage when initializing the state
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    // Save the cart items in local storage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (item: any) => {
    setCartItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };