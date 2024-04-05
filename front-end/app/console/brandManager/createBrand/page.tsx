"use client";
import {
  Card,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";


export default function CreateNewProductsPage() {
  const baseURL = "http://26.221.156.50:5000";
  const axios = require("axios");
  const [brandName, setBrandName] = useState([]);
  const [brandDescription, setBrandDescription] = useState([])

  const [token, setToken] = useState("");
  useEffect(() => {
    const savedToken = window.localStorage.getItem("accessToken");
    if (savedToken === null) {
      console.log("No token found");
      alert("You must Login to access these function");
    } else {
      setToken(savedToken);
    }
  }, []);
  // Hàm kiểm tra tên sản phẩm not null
  const checkNameValid = React.useMemo(() => {
    if (brandName === "") return true;
    return false;
  }, [brandName]);
  //Kiểm tra quantity + price
  function isPositiveInteger(value) {
    return /^\+?[1-9]\d*$/.test(value);
  }
  // Function to handle image selection
  //Function tạo data mới
  const newBrandData = {
    name: brandName,
    description: brandDescription,
  };
  function createNewBrand() {

    axios
      .post(`${baseURL}/brands`
        , newBrandData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      .then(function (res) {
        console.log("Create new success!!!");
        console.log(res.data);
        // Notify user
        alert("Brand created successfully!. Closing this tab");
        // Close tab
        window.close();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div>
      <h1 className="text-4xl">Create New Brand</h1>
      <Card>
        <Spacer y="10px" />
        <div className="w-[700px] p-3">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="name"
              label="Name"
              placeholder="Enter Brand name"
              value={brandName}
              isInvalid={checkNameValid}
              color={checkNameValid ? "danger" : "success"}
              errorMessage={checkNameValid && "Please enter a valid name"}
              onValueChange={(value) => setBrandName(value)}
            />
          </div>
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="name"
              label="Description"
              placeholder="Enter Brand description"
              value={brandDescription}
              onValueChange={(value) => setBrandDescription(value)}
            />
          </div>
          <Spacer y="10px" />
        </div>
      </Card>
      <Spacer y="10px" />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={() => createNewBrand()}
      >
        Create
      </Button>
    </div>
  );
}
