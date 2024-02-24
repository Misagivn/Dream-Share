"use client";
import React from "react";

import Featured from "./homepage/featured";
import NewProduct from "./homepage/newProduct";
import BestSeller from "./homepage/bestSeller";
import ImageListing from "./homepage/imageListing";

fetch("http://26.221.156.50:5000/products/1")
  .then((response) => response.json())
  .then((data) => {
    const firstElement = data[0];
    // Handle the first element here
  })
  .catch((error) => {
    // Handle any errors here
  });
  
export default function Home() {
  return (
    <div>
      <Featured />
      <NewProduct />
      <BestSeller />
      <ImageListing />
    </div>
  );
}
