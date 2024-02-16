"use client";
import React from "react";

import Featured from "./homepage/featured";
import NewProduct from "./homepage/newProduct";
import BestSeller from "./homepage/bestSeller";
import ImageListing from "./homepage/imageListing";

fetch("https://65cd13f5dd519126b8401401.mockapi.io/NewProduct")
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
