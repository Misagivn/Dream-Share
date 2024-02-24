"use client";

import React from "react";
import { H1, H2, Wrapper } from "./page.styled";

const RefundPolicy: React.FC = () => {
  return (
    <Wrapper>
      <H1>Refund Privacy</H1>
      <H2>I have received the incorrect item</H2>
      <p>
        If you believe you have received the wrong item, please reach out to us
        as soon as possible through live chat and our team will confirm with you
        and arrange a replacement as soon as possible.
      </p>
      <p>
        Please note, sometimes we will re-use leftover boxes from larger
        products to protect small products during shipping.
      </p>
      <H2>I ordered the wrong item</H2>
      <p>
        We try to make our website as accurate as possible, but if you’re unsure
        before placing an order – please reach out to us on live chat and we can
        help to double-check you’re purchasing the right product for your needs.
      </p>
      <p>
        If you believe the product information on our website that lead you to
        purchase was incorrect then please send us a message on live chat with
        more information so that we can help to remedy the situation and get you
        back on track.
      </p>
      <H2>I have changed my mind about a purchase</H2>
      <p>
        If you have received your order but have decided that you no longer want
        the product – we can accept a return on most stocked items within 14
        days of their delivery. Please note, we do not issue cash refunds for
        “change of mind” returns – we will only issue store credit.
      </p>
      <p>
        “Change of mind” returns are accepted at our discretion, and a minimum
        restocking fee of at least 25% will be applied if the item is opened,
        used or damaged in any way that may affect it’s ability to be resold.
      </p>
      <p>
        If you’d like to return an item that you’ve changed your mind on, please
        contact us via live chat within 14 days of the item's delivery. Our team
        will arrange to get the product back to us for inspection, and if the
        condition is deemed acceptable we will issue a credit note for the
        product (minus any restocking fees)
      </p>
      <H2>My order has arrived, but it appears damaged</H2>
      <p>
        All Dream Share deliveries are signature required – This means if you
        receive a package that appears to be damaged you can DECLINE delivery
        and the item will be returned to us by the courier service, and we will
        arrange a replacement.
      </p>
      <p>
        However, If you have received an item that appears to be damaged, but
        you didn’t get the chance to decline delivery - please take some clear
        photos of the damage and contact us via live chat as soon as possible
        and we will work to remedy the situation and replace the goods if
        necessary.
      </p>
    </Wrapper>
  );
};

export default RefundPolicy;
