"use client";
import React from "react";
import Featured from "./homepage/featured";
import NewProduct from "./homepage/newProduct";
import BestSeller from "./homepage/bestSeller";
import ImageListing from "./homepage/imageListing";
import { CartProvider } from "./components/CartContext";

fetch("http://26.221.156.50:5000/products/1")
  .then((response) => response.json())
  .then((data) => {
    const firstElement = data[0];
  })
  .catch((error) => {
    // Handle any errors here
  });

export default function Home() {
  return (
    <>
        <CartProvider>
          <Featured />
          <NewProduct />
          <BestSeller />
          <ImageListing />
        </CartProvider>
    </>
  );
}
