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

export default function EditBrandPage({ params }) {
  const currentId = params.id;

  const baseURL = "http://26.221.156.50:5000";
  const axios = require("axios");
  const [brandName, setBrandName] = useState([]);
  const [brandDescription, setBrandDescription] = useState([]);
  const [brandStatus, setBrandStatus] = useState([]);
  //fetch product data theo id
  useEffect(() => {
    axios
      .get(`${baseURL}/brands/${currentId}`)
      .then((res) => {
        const dataFetch = res.data.brand;
        console.log(res.data.brand);
        setBrandName(dataFetch.name);
        setBrandDescription(dataFetch.description);
        setBrandStatus(dataFetch.status);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrandStatus(e.target.value);
    console.log("Status: " + e.target.value);
  }
  //Function tạo data mới
  const newBrandData = {
    name: brandName,
    description: brandDescription,
    status: brandStatus,
    // image: selectedFile
  };
  function updateBrand() {
    axios
      .put(
        `${baseURL}/brands/${currentId}`,
        newBrandData
      )
      .then(function (res) {
        console.log("Create new success!!!");
        console.log(res.data);
        // Notify user
        alert("Brand Updated successfully!. Closing this tab");
        // Close tab
        window.close();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div>
      <h1 className="text-4xl">Edit Product</h1>
      <Card>
        <Spacer y="10px" />
        <div className="w-[700px] p-3">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="name"
              label="Name"
              placeholder="Enter brand name"
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
              type="Description"
              label="Brand Description"
              placeholder="Enter brand description"
              value={brandDescription}
              onValueChange={(value) => setBrandDescription(value)}
            />
          </div>
          <Spacer y='10px'/>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
                label="Brand Status"
                placeholder="Select product status"
                isRequired
                defaultSelectedKeys={brandStatus}
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
        onClick={() => updateBrand()}
      >
        Update
      </Button>
    </div>
  );
}
