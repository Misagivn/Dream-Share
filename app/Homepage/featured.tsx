import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import React from "react";
import { ButtonSpacing, FeaturedProduct, Title } from "./featured.styled";

export default function Featured() {
  return (
    <FeaturedProduct>
      <div>
        <Title>Featured Product</Title>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere autem
          dolor cumque nemo unde nesciunt, eligendi sit modi nobis amet, rem
          quisquam? Delectus, quibusdam consequuntur. Suscipit optio inventore
          quaerat enim
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
  );
}
