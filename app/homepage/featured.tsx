import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import React from "react";
import { ButtonSpacing, FeaturedProduct, Title } from "./featured.styled";
import data from "../featured.json"

export default function Featured() {

  return (
    <div>
      {data.map((item) => (
        <FeaturedProduct key={item.id}>
        <div>
          <Title>{item.name}</Title>
          <p>
            {item.description}
          </p>
          <ButtonSpacing>
            <Button color="primary" variant="bordered">
              Read More
            </Button>
            <Button color="primary" variant="solid">
              Add to Cart
            </Button>
          </ButtonSpacing>
        </div>
        <Image
          width={400}
          alt="NextUI hero Image"
          src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        />
      </FeaturedProduct>
      ))}
    </div>
  );
}
