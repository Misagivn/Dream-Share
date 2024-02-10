import { Display, Wrapper, Header, Title } from "./bestSeller.styled";
import Item from "./items";

export default function BestSeller() {
  return (
    <Wrapper>
      <Header>
        <Title>Best Seller</Title>
        <a href="">Read more...</a>
      </Header>
      <Display>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Display>
    </Wrapper>
  );
}
