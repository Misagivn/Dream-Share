"use client";
import {
  Card,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";


export default function CreateNewCategoryPage() {
  const baseURL = "http://26.221.156.50:5000";
  const axios = require("axios");
  const [categoryName, setCategoryName] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState([])
  // Hàm kiểm tra tên sản phẩm not null
  const checkNameValid = React.useMemo(() => {
    if (categoryName === "") return true;
    return false;
  }, [categoryName]);
  //Kiểm tra quantity + price
  function isPositiveInteger(value) {
    return /^\+?[1-9]\d*$/.test(value);
  }
  // Function to handle image selection
  //Function tạo data mới
  const newCategoryData = {
    name: categoryName,
    description: categoryDescription,
  };
  function createNewCategory() {

    axios
      .post(`${baseURL}/categories`
        , newCategoryData)
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
      <h1 className="text-4xl">Create New Category</h1>
      <Card>
        <Spacer y="10px" />
        <div className="w-[700px] p-3">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="name"
              label="Name"
              placeholder="Enter Category name"
              value={categoryName}
              isInvalid={checkNameValid}
              color={checkNameValid ? "danger" : "success"}
              errorMessage={checkNameValid && "Please enter a valid name"}
              onValueChange={(value) => setCategoryName(value)}
            />
          </div>
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="name"
              label="Description"
              placeholder="Enter Category description"
              value={categoryDescription}
              onValueChange={(value) => setCategoryDescription(value)}
            />
          </div>
          <Spacer y="10px" />
        </div>
      </Card>
      <Spacer y="10px" />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={() => createNewCategory()}
      >
        Create
      </Button>
    </div>
  );
}
