"use client";
import React from "react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import Featured from "@/app/homepage/featured";
import newProduct form "@/app/homepage/newProduct";

export default function Home() {
  return (
      <div>
        <Featured/>
        <div>
          New Product
        </div>
      </div>
  );
}
