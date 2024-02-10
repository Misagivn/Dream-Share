import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function Item() {
  return (
    <div>
      <Card
        isFooterBlurred
        className="w-[420px] h-[300px] col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            COLLECTION
          </p>
          <h4 className="text-white/90 font-medium text-xl">
            ITEM TITLE
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="/images/card-example-5.jpeg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">90.00</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
