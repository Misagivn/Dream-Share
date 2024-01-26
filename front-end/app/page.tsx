'use client'
import React from "react";

import axios, { Axios } from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Image 
      className="z-0 w-full"
      alt="demo pic"
      src="../components/image/00016-1469429408.png"
      />
      <h1 className="text-3xl">Categories</h1>
      <div className="max-w-[1200px] gap-2 grid-cols-4 grid-rows-2 px-8">
        <Card className="col-span-12 sm:col-span-4 h-[300px] w-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              What to watch
            </p>
            <h4 className="text-white font-medium text-large">
              Stream the Acme event
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 object-cover"
            src="../components/image/00016-1469429408.png"
          />
        </Card>
      </div>
    </section>
  );
}
