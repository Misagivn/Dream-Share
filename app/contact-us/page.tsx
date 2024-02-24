"use client";

import React from "react";
import { Paragraph, Strong, Title, Title2, Wrapper } from "./page.styled";

function BlankPage() {
  return (
    <Wrapper>
      <Title>Contact Us</Title>
      <Title2>Dream Share:</Title2>
      <Paragraph>
        VRG2+27X, Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Dương, Vietnam
      </Paragraph>
      <Paragraph>Phone: +84 123456789</Paragraph>
      <Title2>Open Hours</Title2>
      <Paragraph>Monday - Friday: 9:00 AM - 5:00 PM</Paragraph>
      <Paragraph>Saturday: 8:00 AM - 2:00 PM</Paragraph>
      <Paragraph>Sunday & Public Holiday: Closed</Paragraph>
      <Title2></Title2>
      <Paragraph>
        <Strong>Please Note: </Strong>Our showroom is mainly intended to
        showcase our products and for, We do not display the full range of
        products listed in our online store.
      </Paragraph>
    </Wrapper>
  );
}

export default BlankPage;
