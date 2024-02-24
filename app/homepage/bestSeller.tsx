import { Display, Wrapper, Header, Title } from "./bestSeller.styled";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function BestSeller() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://65cd13f5dd519126b8401401.mockapi.io/NewProduct")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Wrapper>
      <Header>
        <Title>Best Seller</Title>
        <a href="/best-seller">Read more...</a>
      </Header>
      <Display>
        {data.slice(0, 12).map((item, index) => (
          <Card
            key={index}
            isFooterBlurred
            className="w-[260px] h-[300px] col-span-12 sm:col-span-7"
          >
            <CardHeader className="absolute bg-black/70 z-10 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                {(item as { collection: string }).collection}
              </p>
              <h4 className="text-white/90 font-medium text-xl">
                {(item as { title: string }).title}
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src={(item as { image: string }).image}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">
                    {(item as { price: string }).price} USD
                  </p>
                </div>
              </div>
              <Button radius="full" size="sm">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Display>
    </Wrapper>
  );
}
