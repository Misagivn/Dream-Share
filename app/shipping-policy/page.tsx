/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { H1, H2, Wrapper } from "./page.styled";

const ShippingPolicy: React.FC = () => {
  return (
    <Wrapper>
      <H1>Shipping Policy</H1>
      <H2>Domestic Shipping Policy</H2>
      <p>
        <strong>Shipment processing time</strong>
      </p>
      <p>
        All orders are processed within 1-2 business days. Orders are not
        shipped or delivered on weekends or public holidays.
      </p>
      <p>
        If we are experiencing a high volume of orders, shipments may be delayed
        by a few days. Please allow additional days in transit for delivery. If
        there will be a significant delay in shipment of your order, we will
        contact you via email or telephone.
      </p>
      <p>
        <strong>Shipping rates & delivery estimates</strong>
      </p>
      <p>
        Shipping charges for your order will be calculated and displayed at
        checkout.
      </p>
      <p>
        <strong>Shipment confirmation & Order tracking</strong>
      </p>
      <p>
        You will receive a Shipment Confirmation email once your order has
        shipped, this emails will contain your tracking number(s). The tracking
        number will be active within 24 hours.
      </p>
      <H2>Shipping Protection</H2>
      <p>
        Although we make every effort to guarantee the safety of your orders,
        sometimes things go wrong! Unfortunately, whether it's due to error or
        sometimes even theft - Couriers cannot always guarantee your order will
        arrive at your doorstep safely!
      </p>
      <p>
        Shipping Protection helps us replace the product you ordered in the case
        of an issue in transit. If you encounter an issue with your order,
        simply reach out to us here at Dream Share and we will handle your claim
        as soon as possible.
      </p>
      <H2>International Shipping</H2>
      <p>
        Dream Share use DHL for International Shipping on selected product to
        selected region, please contact our sales team for more detail.
      </p>
    </Wrapper>
  );
};

export default ShippingPolicy;
