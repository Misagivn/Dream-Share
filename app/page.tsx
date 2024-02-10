"use client";
import React from "react";

import Featured from "./homepages/featured";
import NewProduct from "./homepages/newProduct";
import BestSeller from "./homepages/bestSeller";
import ImageListing from "./homepages/imageListing";

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
