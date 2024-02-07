"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";

const styled = {
  Featured: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gap: 100,
    padding: "0px 100px 0px 100px",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  Title: {
    fontSize: 50,
    fontWeight: 700,
  },
  Button: {
    margin: "10px 10px 0px 0px",
  },
};

export default function Featured() {
  return (
    <div className="Featured-Product" style={styled.Featured}>
      <div>
        <h1 className="Title" style={styled.Title}>
          Featured Product
        </h1>
        <p className="Desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere autem
          dolor cumque nemo unde nesciunt, eligendi sit modi nobis amet, rem
          quisquam? Delectus, quibusdam consequuntur. Suscipit optio inventore
          quaerat enim
        </p>
        <Button color="primary" variant="bordered" style={styled.Button}>
          Read More
        </Button>
        <Button color="primary" variant="solid" style={styled.Button}>
          Add to Cart
        </Button>
      </div>
      <Image
        width={400}
        alt="NextUI hero Image"
        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
      />
    </div>
  );
}
