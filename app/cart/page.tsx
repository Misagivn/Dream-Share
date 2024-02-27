"use client";

import { CartProvider, useCart } from "../components/CartContext";
import CartItems from "../components/ViewCart";
import { Col5, Col7, H2, Wrapper } from "./page.styled";

const CartPage: React.FC = () => {
  return (
    <CartProvider>
      <Wrapper>
        <Col7>
          <H2>Cart</H2>
          <CartItems />
        </Col7>
        <Col5>
          <H2>Order Summary</H2>
        </Col5>
      </Wrapper>
    </CartProvider>
  );
};

export default CartPage;
