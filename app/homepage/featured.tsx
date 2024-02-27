import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import {
  ButtonSpacing,
  FeaturedProduct,
  Title,
  Image,
} from "./featured.styled";
import { useCart } from "../components/CartContext";

export default function Featured() {
  const { addToCart } = useCart();
  const handleAddToCart = (data: any) => {
    addToCart(data);
    console.log(data);
  };
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://65cd13f5dd519126b8401401.mockapi.io/Product")
      .then((response) => response.json())
      .then((data) => setData(data[0]))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {data && (
        <FeaturedProduct>
          <div>
            <Title>{data["title"]}</Title>
            <p>{data["description"]}</p>
            <ButtonSpacing>
              <Button color="primary" variant="bordered">
                Read More
              </Button>
              <Button color="primary" variant="solid" onClick={() => handleAddToCart(data)}>
                Add to Cart
              </Button>
            </ButtonSpacing>
          </div>
          <Image alt="NextUI hero Image" src={data["image"]} />
        </FeaturedProduct>
      )}
    </div>
  );
}
