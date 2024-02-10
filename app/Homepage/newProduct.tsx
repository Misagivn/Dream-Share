import Item from "./items";
import { Display, Global, Header, Title } from "./newProduct.styled";

export default function NewProduct() {
  return (
    <Global>
      <Header>
        <Title>New Product</Title>
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
      </Display>
    </Global>
  );
}
