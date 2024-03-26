"use client";
import { Card, Input, Spacer, Image, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function ViewStaffPage({ params }) {
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
        setSelectedStatus(dataFetch.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const backToHome = () => {
    window.close();
  };

  return (
    <div>
      <h1 className="text-4xl">View Staff Info</h1>
      <Card>
        <Spacer y="10px" />
        <div className="w-[700px] p-3">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              isInvalid
              type="name"
              label="Name"
              placeholder="Staff name"
              value={staffName}
            />
            <Input
              isInvalid
              type="email"
              label="Staff email"
              placeholder="Enter staff email"
              value={staffEmail}
            />
          </div>
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              isInvalid
              type="name"
              label="Password"
              placeholder="Enter staff passoword"
              value={staffPassword}
            />
            <Input
              isInvalid
              type="phoenumber"
              label="Staff phonenumber"
              placeholder="Enter staff phonenumber"
              value={staffPhonenumber}
            />
          </div>
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              isInvalid
              type="gender"
              label="Staff Gender"
              placeholder="Staff Gender"
              value={selectedSex}
            />
            <Input
              isInvalid
              type="status"
              label="Staff Status"
              placeholder="Staff Status"
              value={selectedStatus}
            />
          </div>
          <Spacer y="10px" />
          <Input
            isInvalid
            type="address"
            label="Staff Address"
            placeholder="Staff Address"
            value={staffAddress}
          />
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
