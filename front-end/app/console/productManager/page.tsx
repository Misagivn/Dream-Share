"use client";
import { title } from "@/components/primitives";
import { Accordion, AccordionItem, Card, Spacer } from "@nextui-org/react";
import { Axios } from "axios";
import { useEffect, useState } from "react";
import { PlusIcon } from "./PlusIcon";
import { SearchIcon } from "./SearchIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";

export default function ProductManager() {
  const axios = require("axios");
  const [product, setProduct] = useState(null); //Tạo state cho product

  const baseURL = "http://localhost:5000";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    axios
      .get("http://localhost:5000/products/", {})
      .then(function (res) {
        console.log(res.data.products);
        setProduct(res.data.products);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const INIT_VISIBLE_COLUMNS = ["name", "quantity", "status", "action"];
  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  //{product.map(setProduct => <li>{setProduct.name}</li>)}
  return (
    <div className="">
      <h1 className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
        Product Manager
      </h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {product?.map((sp, index) => (
            <tr key={index}>
              <td>{sp.id}</td>
              <td>{sp.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
}
