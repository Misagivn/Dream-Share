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

export default function CreateNewProductsPage({params}) {
  const currentId = params.id;

  const baseURL = "http://localhost:5000";
  const axios = require("axios");
  const [staffName, setStaffName] = useState("Staff name here");
  const [staffEmail, setStaffEmail] = useState([]);
  const [staffPassword, setStaffPassword] = useState([]);
  const [staffPhonenumber, setStaffPhonenumber] = useState([]);
  const [staffAddress, setStaffAddress] = useState([]);
  //State cho selected và inputdata
  const [selectedSex, setSelectedSex] = React.useState<string>("");


  // Hàm kiểm tra tên sản phẩm not null
  const checkNameValid = React.useMemo(() => {
    if (staffName === "") return true;
    return false;
  }, [staffName]);
  //fetch staff data tu API
  useEffect(() => {
    axios
    .get(`${baseURL}/staffs/${currentId}`)
    .then((res) => {
      const dataFetch = res.data.staff;
      console.log(dataFetch);
      setStaffName(dataFetch.name);
      setStaffEmail(dataFetch.email);
      setStaffPassword(dataFetch.password);
      setStaffPhonenumber(dataFetch.phonenumber);
      setStaffAddress(dataFetch.address);
      setSelectedSex(dataFetch.gender);
    })
  })
  const handleSexSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSex(e.target.value);
    console.log("Type ID: " + e.target.value);
  };
  //Function tạo data mới
  const newProductData = {
    role_id: 2,
    name: staffName,
    password: staffPassword,
    email: staffEmail,
    phonenumber: staffPhonenumber,
    gender: selectedSex,
    status: "Active",
    address: staffAddress,
  };
  function createNewStaff() {
    axios
      .post(
        `${baseURL}/staffs`,
        newProductData
      )
      .then(function (res) {
        console.log("Create new success!!!");
        console.log(res.data);
        // Notify user
        alert("Staff created successfully!. Closing this tab");
        // Close tab
        window.close();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div>
      <h1 className="text-4xl">Create New Staff</h1>
      <Card>
        <Spacer y="10px" />
        <div className="w-[700px] p-3">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="name"
              label="Name"
              placeholder="Enter product name"
              value={staffName}
              isInvalid={checkNameValid}
              color={checkNameValid ? "danger" : "success"}
              errorMessage={checkNameValid && "Please enter a valid name"}
              onValueChange={(value) => setStaffName(value)}
            />
            <Input
              type="email"
              label="Email"
              placeholder="Enter staff Email"
              value={staffEmail}
              onValueChange={(value) => setStaffEmail(value)}
            />
          </div>
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="password"
              label="Password"
              placeholder="Enter account password"
              value={staffPassword}
              onValueChange={(value) => setStaffPassword(value)}
            />
            <Input
              type="phonenumber"
              label="Phonenumber"
              placeholder="Enter staff phonenumber"
              value={staffPhonenumber}
              onValueChange={(value) => setStaffPhonenumber(value)}
            />
          </div>
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
              items={types}
              label="Staff Sex"
              placeholder="Select Sex"
              isRequired
              className=""
              defaultSelectedKeys={selectedSex.toString()}
              onChange={handleSexSelect}
            >
              <SelectItem value="Men" key={"Men"} color="success">
                Man
              </SelectItem>
              <SelectItem value="Women" key={"Women"} color="warning">
                Woman
              </SelectItem>
            </Select>
            <Input
              type="address"
              label="Address"
              placeholder="Enter staff Address"
              onValueChange={(value) => setStaffAddress(value)}
            />
          </div>
          <Spacer y="10px" />
        </div>
      </Card>
      <Spacer y="10px" />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={() => createNewStaff()}
      >
        Create
      </Button>
    </div>
  );
}
