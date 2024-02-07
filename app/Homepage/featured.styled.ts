import { Button } from "@nextui-org/button";
import styled from "styled-components";

export const FeaturedProduct = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 0px 100px 0px 100px;
  justify-content: space-evenly;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;
export const ButtonSpacing = styled.div`
    padding: 10px 0px 0px 0px;
    display: flex;
    gap: 5px;
`