import { Button } from "@nextui-org/button";
import { Card, Wrapper, Container, Input, Image, ButtonSpacing, Title } from "./imageListing.styled";

export default function ImageListing() {
  return (
    <div>
      <Title>Interst in our interior space?</Title>
      <Wrapper>
        <Container>
          <Input type="radio" name="slide" id="c1" checked></Input>
          <Card htmlFor="c1">
            <Image
              alt=""
              src="https://media.designcafe.com/wp-content/uploads/2023/01/31151510/contemporary-interior-design-ideas-for-your-home.jpg"
            />
          </Card>
          <Input type="radio" name="slide" id="c2" checked></Input>
          <Card htmlFor="c2">
            <Image
              alt=""
              src="https://www.sbid.org/wp-content/uploads/2022/04/spacejoy-4xRP0Ajk9ys-unsplash-e1655133373712.jpg"
            />
          </Card>
          <Input type="radio" name="slide" id="c3" checked></Input>
          <Card htmlFor="c3">
            <Image
              alt=""
              src="https://www.decorilla.com/online-decorating/wp-content/uploads/2020/06/modern-interior-design-living-room-by-decorilla-designer-mladen-c.jpeg"
            />
          </Card>
          <Input type="radio" name="slide" id="c4" checked></Input>
          <Card htmlFor="c4">
            <Image
              alt=""
              src="https://static.wixstatic.com/media/1dffdf_3395c0921fd045d09edfa3292f58eb04~mv2.jpg/v1/fill/w_640,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1dffdf_3395c0921fd045d09edfa3292f58eb04~mv2.jpg"
            />
          </Card>
        </Container>
      </Wrapper>
      <ButtonSpacing>
        <Button color="primary" variant="solid">
          Visit Now
        </Button>
      </ButtonSpacing>
    </div>
  );
}
