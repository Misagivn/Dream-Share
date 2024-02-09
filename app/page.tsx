"use client";
import React from "react";

import Featured from "./homepage/featured";
import NewProduct from "./homepage/newProduct";

export default function Home() {
  return (
      <div>
        <Featured/>
        <NewProduct/>
      </div>
  );
}
