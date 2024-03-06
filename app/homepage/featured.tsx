import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import {
  ButtonSpacing,
  FeaturedProduct,
  Title,
  Image,
} from "./featured.styled";
import { useCart } from "../components/CartContext";
import axios from "axios";

export default function Featured() {
  const { addToCart } = useCart();
  const handleAddToCart = (data: any) => {
    addToCart(data);
    console.log(data);
  };
  const [product, setProduct] = useState([]);
  const baseURL = "http://localhost:5000";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    axios
      .get("http://localhost:5000/products/", {})
      .then(function (res) {
        console.log(data);
        setProduct(res.data.products);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  let firstProduct = product[0];
  console.log(firstProduct);
  return (
    <div key={firstProduct}>
      <FeaturedProduct>
        <div>
          <Title>{firstProduct}</Title>
          <p></p>
          <ButtonSpacing>
            <Button color="primary" variant="bordered">
              Read More
            </Button>
            <Button
              color="primary"
              variant="solid"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </ButtonSpacing>
        </div>
        <Image alt="NextUI hero Image" src="" />
      </FeaturedProduct>
    </div>
  );
}
