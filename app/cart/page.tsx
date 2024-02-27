"use client";

import { CartProvider, useCart } from "../components/CartContext";
import ViewCart from "../components/ViewCart";

const CartPage: React.FC = () => {
  return (
    <CartProvider>
      <ViewCart />
    </CartProvider>
  );
};

export default CartPage;
