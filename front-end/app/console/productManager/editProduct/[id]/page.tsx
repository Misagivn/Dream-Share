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

  //fetch type từ API
  useEffect(() => {
    axios
      .get(`${baseURL}/types`)
      .then(function (res) {
        console.log(res.data.types);
        setType(res.data.types);
      })
      .catch(function (err) {
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
        setSelectedFile(dataFetch.image)
        setProductDescription(dataFetch.description);
        setProductCode(dataFetch.code);
        setProductQuantity(dataFetch.quantity);
        setProductSize(dataFetch.size);
        setProductColor(dataFetch.color);
        setProductPrice(dataFetch.price);
        setSelectedType(dataFetch.type_id);
        setSelectedBrand(dataFetch.brand_id)
        setSelectedCategory(dataFetch.cate_id)
        setProductStatus(dataFetch.status);
        setIsHighlighted(dataFetch.highlight);
      })
      .catch((err) => {
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
    // image: selectedFile
  };
  function updateProduct() {
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
    // formData.append("image", selectedFile);
    console.log("Do update")
    console.log(newProductData)
    axios
      .put(
        `${baseURL}/products/${currentId}`,
        // formData,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // },
        newProductData
      )
      .then(function (res) {
        console.log("Create new success!!!");
        console.log(res.data);
        // Notify user
        alert("Product Updated successfully!. Closing this tab");
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
          {/* <Button color="success" endContent={<CameraIcon />}>
            <label htmlFor="imageInput">Choose A Photo</label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              color="success"
              onChange={handleImageSelection}
            />
          </Button> */}
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
              value={productCode}
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
            defaultSelectedKeys={JSON.stringify(selectedType)}
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
            defaultSelectedKeys={JSON.stringify(selectedBrand)}
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
            defaultSelectedKeys={JSON.stringify(selectedCategory)}
            onChange={handleCategorySelect}
          >
            {(category) => (
              <SelectItem key={category.id}>{category.name}</SelectItem>
            )}
          </Select>
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="Description"
              label="Product Description"
              placeholder="Enter product description"
              value={productDescription}
              onValueChange={(value) => setProductDescription(value)}
            />
            <Select
              label="Product Status"
              placeholder="Select product status"
              isRequired
              defaultSelectedKeys={productStatus}
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
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Switch
              defaultValue={isHighlighted}
              onChange={(value) => setIsHighlighted(value)}
            >
              High Light
            </Switch>
            <Input
              type="quantity"
              label="Product Quantity"
              isInvalid={checkQuantiyValid}
              placeholder="Enter product quantity"
              value={productQuantity}
              onValueChange={(value) => setProductQuantity(value)}
            />
            <Input
              type="size"
              label="Product size"
              placeholder="Enter product size"
              value={productSize}
              onValueChange={(value) => setProductSize(value)}
            />
            <Input
              type="color"
              label="Product Color"
              placeholder="Enter product color"
              value={productColor}
              onValueChange={(value) => setProductColor(value)}
            />
            <Input
              type="price"
              label="Product price"
              isRequired={checkPriceValid}
              errorMessage={checkPriceValid && "Please enter a valid number"}
              placeholder="Enter product price"
              value={productPrice}
              onValueChange={(value) => setProductPrice(value)}
            />
          </div>
        </div>
      </Card>
      <Spacer y="10px" />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={() => updateProduct()}
      >
        Update
      </Button>
    </div>
  );
}
