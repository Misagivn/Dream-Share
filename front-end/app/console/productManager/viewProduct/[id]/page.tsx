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

export default function EditProductsPage({ params }) {
  const currentId = params.id;

  const baseURL = "http://localhost:5000";
  const axios = require("axios");
  const [types, setType] = useState([]);
  const [brands, setBrand] = useState([]);
  const [categories, setCategory] = useState([]);
  const [productName, setProductName] = useState([]);
  const [productCode, setProductCode] = useState([]);
  const [productDescription, setProductDescription] = useState([]);
  const [isHighlighted, setIsHighlighted] = useState(false);
  let defaultHighLight = isHighlighted.toString();
  console.log(defaultHighLight);
  const [productQuantity, setProductQuantity] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productColor, setProductColor] = useState([]);
  const [productStatus, setProductStatus] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  //State cho selected và inputdata
  const [selectedType, setSelectedType] = React.useState<string>("");
  const [selectedBrand, setSelectedBrand] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  let typeId = "";
  const [typeName, setTypeName] = useState([]);

  //fetch type từ API
  //fetch brand từ API
  useEffect(() => {
    axios
      .get(`${baseURL}/brands`)
      .then(function (res) {
        console.log(res.data.brands);
        setBrand(res.data.brands);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  //fetch category từ API
  useEffect(() => {
    axios
      .get(`${baseURL}/categories`)
      .then(function (res) {
        console.log(res.data.categories);
        setCategory(res.data.categories);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  //fetch product data theo id
  useEffect(() => {
    axios
      .get(`${baseURL}/products/${currentId}`)
      .then((res) => {
        const dataFetch = res.data.product;
        console.log(res.data.product);
        setProductName(dataFetch.name);
        setSelectedImage(dataFetch.image);
        setSelectedFile(dataFetch.image);
        setProductDescription(dataFetch.description);
        setProductCode(dataFetch.code);
        setProductQuantity(dataFetch.quantity);
        setProductSize(dataFetch.size);
        setProductColor(dataFetch.color);
        setProductPrice(dataFetch.price);
        setSelectedType(dataFetch.type_id);
        typeId = dataFetch.type_id.toString();
        setSelectedBrand(dataFetch.brand_id);
        setSelectedCategory(dataFetch.cate_id);
        setProductStatus(dataFetch.status);
        setIsHighlighted(dataFetch.highlight);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("this is type id: ", typeId);
    axios
      .get(`${baseURL}/types/${typeId}`)
      .then(function (res) {
        console.log("this is  type", res.data.type.id);
        setTypeName(res.data.type.name);
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
  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductStatus(e.target.value);
    console.log("Status: " + e.target.value);
  };

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
    // image: selectedFile
  };

  const backToHome = () => {
    window.close();
  };
  

  return (
    <div>
      <h1 className="text-4xl">View Product</h1>
      <Card>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5 pl-5">
          <Image
            width={480}
            height={300}
            alt="NextUI hero Image"
            src={selectedImage}
          />
        </div>
        <Spacer y="10px" />
        <div className="w-[700px] p-3">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              isInvalid
              type="name"
              label="Name"
              placeholder="Enter product name"
              value={productName}
            />
            <Input
              isInvalid
              type="code"
              label="Product code"
              placeholder="Enter product code"
              value={productCode}
            />
          </div>
          <Spacer y="10px" />
          <Input
            isInvalid
            type="type"
            label="Product Type"
            placeholder="Enter product type"
            value={selectedType}
          />
          <Spacer y="10px" />
          <Input
            isInvalid
            type="type"
            label="Product Brand"
            placeholder="Enter product Brand"
            value={selectedBrand}
          />
          <Spacer y="10px" />
          <Input
            isInvalid
            type="type"
            label="Product Type"
            placeholder="Enter product Category"
            value={selectedCategory}
          />
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              isInvalid
              type="Description"
              label="Product Description"
              placeholder="Enter product description"
              value={productDescription}
            />
            <Input
              isInvalid
              type="type"
              label="Product Status"
              placeholder="Enter product status"
              value={productStatus}
            />
          </div>
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              isInvalid
              type="quantity"
              label="Product Quantity"
              placeholder="Enter product quantity"
              value={productQuantity}
            />
            <Input
              isInvalid
              type="size"
              label="Product size"
              placeholder="Enter product size"
              value={productSize}
            />
            <Input
              isInvalid
              type="color"
              label="Product Color"
              placeholder="Enter product color"
              value={productColor}
            />
            <Input
              isInvalid
              type="price"
              label="Product price"
              placeholder="Enter product price"
              value={productPrice}
            />
          </div>
        </div>
      </Card>
      <Spacer y="10px" />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={() => backToHome()}
      >
        Back
      </Button>
    </div>
  );
}
