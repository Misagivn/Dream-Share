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

export default function EditStaffPage({params}) {
  const currentId = params.id;

  const baseURL = "http://localhost:5000";
  const axios = require("axios");
  const [staffName, setStaffName] = useState([]);
  const [staffEmail, setStaffEmail] = useState([]);
  const [staffPassword, setStaffPassword] = useState([]);
  const [staffPhonenumber, setStaffPhonenumber] = useState([]);
  const [staffAddress, setStaffAddress] = useState([]);
  //State cho selected và inputdata
  const [selectedSex, setSelectedSex] = React.useState<string>("");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");

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
      console.log(res.data.staff);
      setStaffName(dataFetch.name);
      setStaffEmail(dataFetch.email);
      setStaffPassword(dataFetch.password);
      setStaffPhonenumber(dataFetch.phonenumber);
      setStaffAddress(dataFetch.address);
      setSelectedSex(dataFetch.gender);
      setSelectedStatus(dataFetch.status)
    })
    .catch ((err) => {console.log(err);})
  }, [])
  const handleSexSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSex(e.target.value);
    console.log("Sex selected: " + e.target.value);
  };
  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    console.log("Status selected: " + e.target.value);
  };
  //Function tạo data mới
  const newProductData = {
    role_id: 2,
    name: staffName,
    password: staffPassword,
    email: staffEmail,
    phonenumber: staffPhonenumber,
    gender: selectedSex,
    status: selectedStatus,
    address: staffAddress,
  };
  function updateStaff() {
    axios
      .put(
        `${baseURL}/staffs/${currentId}`,
        newProductData
      )
      .then(function (res) {
        console.log("Update staff success!!!");
        console.log(res.data);
        // Notify user
        alert("Staff updated successfully!. Closing this tab");
        // Close tab
        window.close();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div>
      <h1 className="text-4xl">Update Staff Information</h1>
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
            <Input
              type="address"
              label="Address"
              placeholder="Enter staff Address"
              value={staffAddress}
              onValueChange={(value) => setStaffAddress(value)}
            />
          </div>
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
                items="Sex"
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
              <Select
                items="Status"
                label="Staff Status"
                placeholder="Select Sex"
                isRequired
                className=""
                defaultSelectedKeys={selectedStatus.toString()}
                onChange={handleStatusSelect}
              >
                <SelectItem value="Active" key={"Active"} color="success">
                  Active
                </SelectItem>
                <SelectItem value="Pending" key={"Pending"} color="warning">
                  Pending
                </SelectItem>
                <SelectItem value="Cancel" key={"Cancel"} color="danger">
                  Cancel
                </SelectItem>
              </Select>
            </div>
          <Spacer y="10px" />
        </div>
      </Card>
      <Spacer y="10px" />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={() => updateStaff()}
      >
        Update
      </Button>
    </div>
  );
}
