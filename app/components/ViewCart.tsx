"use client";
import { CartProvider, useCart } from "./CartContext";
import { Abutton, H1, P, Wrapper } from "../cart/page.styled";

const ViewCart: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <Wrapper>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index}>
            {/* Replace the following with how you want to display each item */}
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <img src={item.image} alt={item.name} />
          </div>
        ))
      ) : (
        <>
          <H1>Your cart is empty</H1>
          <P>You have not added any cart items yet.</P>
          <Abutton href="">Continue shopping</Abutton>
        </>
      )}
    </Wrapper>
  );
};

export default ViewCart;
