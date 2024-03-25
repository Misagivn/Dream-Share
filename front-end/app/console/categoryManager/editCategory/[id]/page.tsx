"use client";
import {
  Card,
  Input,
  Select,
  SelectItem,
  Spacer,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function EditCategoryPage({ params }) {
  const currentId = params.id;

  const baseURL = "http://26.221.156.50:5000";
  const axios = require("axios");
  const [categoryName, setCategoryName] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState([]);
  //fetch product data theo id
  useEffect(() => {
    axios
      .get(`${baseURL}/categories/${currentId}`)
      .then((res) => {
        const dataFetch = res.data.category;
        console.log(res.data.category);
        setCategoryName(dataFetch.name);
        setCategoryDescription(dataFetch.description);
        setCategoryStatus(dataFetch.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Hàm kiểm tra tên sản phẩm not null
  const checkNameValid = React.useMemo(() => {
    if (categoryName === "") return true;
    return false;
  }, [categoryName]);
  //Kiểm tra quantity + price
  function isPositiveInteger(value) {
    return /^\+?[1-9]\d*$/.test(value);
  }

  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryStatus(e.target.value);
    console.log("Status: " + e.target.value);
  }
  //Function tạo data mới
  const newCategoryData = {
    name: categoryName,
    description: categoryDescription,
    status: categoryStatus,
    // image: selectedFile
  };
  function updateCategory() {
    axios
      .put(
        `${baseURL}/categories/${currentId}`,
        newCategoryData
      )
      .then(function (res) {
        console.log("Create new success!!!");
        console.log(res.data);
        // Notify user
        alert("Category Updated successfully!. Closing this tab");
        // Close tab
        window.close();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div>
      <h1 className="text-4xl">Edit Category</h1>
      <Card>
        <Spacer y="10px" />
        <div className="w-[700px] p-3">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="name"
              label="Name"
              placeholder="Enter brand name"
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
              type="Description"
              label="Product Description"
              placeholder="Enter brand description"
              value={categoryDescription}
              onValueChange={(value) => setCategoryDescription(value)}
            />
          </div>
          <Spacer y='10px'/>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
                label="Product Status"
                placeholder="Select product status"
                isRequired
                defaultSelectedKeys={categoryStatus}
                className=""
                onChange={handleStatusSelect}
              >
                <SelectItem value="Active" key={"Active"} color="success">
                  Active
                </SelectItem>
                <SelectItem value="Paused" key={"Paused"} color="warning">
                  Paused
                </SelectItem>
                <SelectItem value="Cancel" key={"Cancel"} color="danger">
                  Cancel
                </SelectItem>
              </Select>
          </div>
        </div>
      </Card>
      <Spacer y="10px" />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={() => updateCategory()}
      >
        Update
      </Button>
    </div>
  );
}
