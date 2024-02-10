"use client";
import React from "react";

import Featured from "./homepage/featured";
import NewProduct from "./homepage/newProduct";
import BestSeller from "./homepage/bestSeller";
import ImageListing from "./homepage/imageListing";

export default function Home() {
  return (
      <div>
        <Featured/>
        <NewProduct/>
        <BestSeller/>
        <ImageListing/>
      </div>
  );
}
