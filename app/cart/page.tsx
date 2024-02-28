"use client";

import { CartProvider, useCart } from "../components/CartContext";
import CartItems from "../components/ViewCart";

const CartPage: React.FC = () => {
  return (
    <CartProvider>
      <CartItems />
    </CartProvider>
  );
};

export default CartPage;
