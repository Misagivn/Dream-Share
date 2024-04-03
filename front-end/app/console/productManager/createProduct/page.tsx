"use client";
import {
  Card,
  Input,
  Select,
  SelectItem,
  Spacer,
  Switch,
  Image,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { CameraIcon } from "./CameraIcon";
import { userToken } from "../page";

export default function CreateNewProductsPage() {
  const baseURL = "http://26.221.156.50:5000";
  const axios = require("axios");
  const [types, setType] = useState([]);
  const [brands, setBrand] = useState([]);
  const [categories, setCategory] = useState([]);
  const [productName, setProductName] = useState("PRODUCT NAME HERE");
  const [productCode, setProductCode] = useState([]);
  const [productDescription, setProductDescription] = useState([]);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [productQuantity, setProductQuantity] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productColor, setProductColor] = useState([]);
  const [productStatus, setProductStatus] = useState("Active");
  const [productPrice, setProductPrice] = useState([]);
  const [productImage, setProductImage] = useState([]);
  //State cho selected và inputdata
  const [selectedType, setSelectedType] = React.useState<string>("");
  const [selectedBrand, setSelectedBrand] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  //fetch type từ API
  useEffect(() => {
    axios
      .get(`${baseURL}/types`)
      .then(function (res) {
        console.log(res.data.types);
        setType(res.data.types);
      })
      .catch(function (err) {
        alert("Can't fetch data. Please inform IT Support");
        console.log(err);
      });
  }, []);
  //fetch brand từ API
  useEffect(() => {
    axios
      .get(`${baseURL}/brands`)
      .then(function (res) {
        console.log(res.data.brands);
        setBrand(res.data.brands);
      })
      .catch(function (err) {
        //alert("Can't fetch data. Please inform IT Support");
        console.log(err);
      });
  }, []);
  //fetch category từ API
  useEffect(() => {
    axios
      .get(`${baseURL}/categories`)
      .then(function (res) {
        //alert("Can't fetch data. Please inform IT Support");
        console.log(res.data.categories);
        setCategory(res.data.categories);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  // Hàm kiểm tra tên sản phẩm not null
  const checkNameValid = React.useMemo(() => {
    if (productName === "") return true;
    return false;
  }, [productName]);
  const checkPriceValid = React.useMemo(() => {
    if (productPrice === "") return true;
    return false;
  }, [productPrice]);
  //Kiểm tra quantity + price
  function isPositiveInteger(value) {
    return /^\+?[1-9]\d*$/.test(value);
  }
  //
  const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    console.log("Type ID: " + e.target.value);
  };

  const handleBrandSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    console.log("Brand ID: " + e.target.value);
  };
  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    console.log("Category ID: " + e.target.value);
  };
  const checkQuantiyValid = React.useMemo(() => {
    if (parseInt(productQuantity) > 0 && isPositiveInteger(productQuantity))
      return false;
  }, [productQuantity]);
  // Function to handle image selection
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  function handleImageSelection(event: { target: { files: any[] } }) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setSelectedImage(imageUrl);
    } else {
      console.log("No File Selected");
    }
  }
  //Function tạo data mới
  const newProductData = {
    type_id: selectedType,
    brand_id: selectedBrand,
    cate_id: selectedCategory,
    code: productCode,
    name: productName,
    description: productDescription,
    highlight: isHighlighted ? 1 : 0,
    quantity: productQuantity,
    size: productSize,
    color: productColor,
    status: productStatus,
    updated_at: "",
    created_at: "",
    price: productPrice,
  };
  function createNewProduct() {
    const formData = new FormData();
    formData.append("type_id", selectedType);
    formData.append("brand_id", selectedBrand);
    formData.append("cate_id", selectedCategory);
    formData.append("code", productCode);
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("highlight", isHighlighted ? 1 : 0);
    formData.append("quantity", productQuantity);
    formData.append("size", productSize);
    formData.append("color", productColor);
    formData.append("status", productStatus);
    formData.append("price", productPrice);
    formData.append("image", selectedFile);

    axios
      .post(
        `${baseURL}/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        newProductData
      )
      .then(function (res) {
        console.log("Create new success!!!");
        console.log(res.data);
        // Notify user
        alert("Product created successfully!. Closing this tab");
        // Close tab
        window.close();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div>
      <h1 className="text-4xl">Create New Product</h1>
      <Card>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5 pl-5">
          <Button color="success" endContent={<CameraIcon />}>
            <label htmlFor="imageInput">Choose A Photo</label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              color="success"
              onChange={handleImageSelection}
            />
          </Button>
          <Image
            width={480}
            height={300}
            alt="NextUI hero Image"
            src={
              selectedImage ||
              "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            }
          />
        </div>
        <Spacer y="10px" />
        <div className="w-[700px] p-3">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="name"
              label="Name"
              placeholder="Enter product name"
              value={productName}
              isInvalid={checkNameValid}
              color={checkNameValid ? "danger" : "success"}
              errorMessage={checkNameValid && "Please enter a valid name"}
              onValueChange={(value) => setProductName(value)}
            />
            <Input
              type="code"
              label="Product code"
              placeholder="Enter product code"
              onValueChange={(value) => setProductCode(value)}
            />
          </div>
          <Spacer y="10px" />
          <Select
            items={types}
            label="Type of the furniture"
            placeholder="Select furniture Type"
            isRequired
            className=""
            onChange={handleTypeSelect}
          >
            {(type) => <SelectItem key={type.id}>{type.name}</SelectItem>}
          </Select>
          <Spacer y="10px" />
          <Select
            items={brands}
            label="Brand of the furniture"
            placeholder="Select furniture Brand"
            isRequired
            className=""
            onChange={handleBrandSelect}
          >
            {(brand) => <SelectItem key={brand.id}>{brand.name}</SelectItem>}
          </Select>
          <Spacer y="10px" />
          <Select
            items={categories}
            label="Category of the furniture"
            placeholder="Select furniture Category"
            isRequired
            className=""
            onChange={handleCategorySelect}
          >
            {(category) => (
              <SelectItem key={category.id}>{category.name}</SelectItem>
            )}
          </Select>
          <Spacer y="10px" />
          <Input
            type="Description"
            label="Product Description"
            placeholder="Enter product description"
            onValueChange={(value) => setProductDescription(value)}
          />
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Switch
              defaultSelected={isHighlighted}
              onChange={(value) => setIsHighlighted(value)}
            >
              High Light
            </Switch>
            <Input
              type="quantity"
              label="Product Quantity"
              isInvalid={checkQuantiyValid}
              placeholder="Enter product quantity"
              onValueChange={(value) => setProductQuantity(value)}
            />
            <Input
              type="size"
              label="Product size"
              placeholder="Enter product size"
              onValueChange={(value) => setProductSize(value)}
            />
            <Input
              type="color"
              label="Product Color"
              placeholder="Enter product color"
              onValueChange={(value) => setProductColor(value)}
            />
            <Input
              type="price"
              label="Product price"
              isRequired={checkPriceValid}
              errorMessage={checkPriceValid && "Please enter a valid number"}
              placeholder="Enter product price"
              onValueChange={(value) => setProductPrice(value)}
            />
          </div>
        </div>
      </Card>
      <Spacer y="10px" />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={() => createNewProduct()}
      >
        Create
      </Button>
    </div>
  );
}
