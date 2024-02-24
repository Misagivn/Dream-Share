import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { ButtonSpacing, FeaturedProduct, Title, Image} from "./featured.styled";

export default function Featured() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://65cd13f5dd519126b8401401.mockapi.io/FeaturedProduct")
      .then((response) => response.json())
      .then((data) => setData(data[0]))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {data && (
        <FeaturedProduct>
          <div>
            <Title>{data['name']}</Title>
            <p>{data['description']}</p>
            <ButtonSpacing>
              <Button color="primary" variant="bordered">
                Read More
              </Button>
              <Button color="primary" variant="solid">
                Add to Cart
              </Button>
            </ButtonSpacing>
          </div>
          <Image alt="NextUI hero Image" src={data['imageUrl']} />
        </FeaturedProduct>
      )}
    </div>
  );
}