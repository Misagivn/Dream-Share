"use client";
import React from "react";

import Featured from "./homepage/featured";
import NewProduct from "./homepage/newProduct";
import BestSeller from "./homepage/bestSeller";
import ImageListing from "./homepage/imageListing";
import Footer from "./homepage/footer";

export default function Home() {
  return (
      <div>
        <Featured/>
        <NewProduct/>
        <BestSeller/>
        <ImageListing/>
        <Footer/>
      </div>
  );
}
