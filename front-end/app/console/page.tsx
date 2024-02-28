"use client";
import { title } from "@/components/primitives";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardHeader,
  Spacer,
  Image,
} from "@nextui-org/react";
import { link } from "fs";

export default function ConsolePage() {
  
  return (
    <div className="max-w-[1600px] item-center">
      <h1 className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
        Managament Tools
      </h1>
      <Spacer y={10} />
      <div className="max-w-[1600px] flex gap-3 grid grid-cols-3">
        <Card shadow="sm" isPressable onPress={() => window.open(`../console/productManager`)} className="h-[200px] max-w-[200px]">
          <CardHeader className="absoutule !item-start z-10 top-1">
            <p className="text-small text-lime-300 text-left uppercase font-bold">Product Manager Tool</p>
          </CardHeader>
          <Image
          removeWrapper
          src="./428623122_2034934390214102_198876324500140266_n.jpg"
          alt="Default Image"
          />
        </Card>
        <Card shadow="sm" isPressable onPress={() => window.open(`http://www.google.com`)} className="h-[200px] max-w-[200px]">
          <CardHeader className="absoutule !item-start z-10 top-1">
            <p className="text-small text-lime-300 text-left uppercase font-bold">Order Manager Tool</p>
          </CardHeader>
        </Card>
        <Card shadow="sm" isPressable onPress={() => window.open(`http://www.google.com`)} className="h-[200px] max-w-[200px]">
          <CardHeader className="absoutule !item-start z-10 top-1">
            <p className="text-small text-lime-300 text-left uppercase font-bold">Staff Manager Tool</p>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
