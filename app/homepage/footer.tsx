import { Link } from "@nextui-org/link";
import {
  Heading,
  ListItem,
  ListWrapper,
  Wrapper,
  Copyright,
} from "./footer.styled";

export default function Footer() {
  return (
    <div>
      <Wrapper>
        <div>
          <Heading>About</Heading>
          <ListWrapper>
            <ListItem>
              <a href="">News</a>
            </ListItem>
            <ListItem>
              <a href="">Gallery</a>
            </ListItem>
            <ListItem>
              <a href="">About Us</a>
            </ListItem>
          </ListWrapper>
        </div>
        <div>
          <Heading>Customer Care</Heading>
          <ListWrapper>
            <ListItem>
              <a href="">Support</a>
            </ListItem>
            <ListItem>
              <a href="">Contact Us</a>
            </ListItem>
          </ListWrapper>
        </div>
        <div>
          <Heading>Quick Links</Heading>
          <ListWrapper>
            <ListItem>
              <a href="">Privacy Policy</a>
            </ListItem>
            <ListItem>
              <a href="">Return & Refund Policy</a>
            </ListItem>
            <ListItem>
              <a href="">Shipping Policy</a>
            </ListItem>
            <ListItem>
              <a href="">Term of Service</a>
            </ListItem>
          </ListWrapper>
        </div>
      </Wrapper>
      <Copyright>
        <Link
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">
            ©2024, Dream Share, Powered by 
          </span>
          <p className="text-primary">NextUI</p>
        </Link>
      </Copyright>
    </div>
  );
}
