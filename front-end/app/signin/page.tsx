"use client";
import { title } from "@/components/primitives";
import { Button, Card, CardBody, Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const baseURL = "http://26.221.156.50:5000";
  const [accEmail, setAccEmail] = useState("");
  const [accPassword, setAccPassword] = useState([]);
  const [loggedIn, setLoggedIn] = useState([]);
  

  const validateEmail = (accEmail: string) => accEmail.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (accEmail === "") return false;

    return validateEmail(accEmail) ? false : true;
  }, [accEmail]);
  const loginData = {
    email: accEmail,
    password: accPassword
  };
  
  function checkAccount() {
    axios
      .post(`${baseURL}/staffs/consoleLogin`, loginData)
      .then(function (res) {
        console.log("Login success!!!");
        const accessToken = res.data.accessToken
        localStorage.setItem('accessToken', accessToken)
        setLoggedIn(true);
        //window.location.href = "/console"
      })
      .catch(function (err) {
        alert("Email or Password is not correct");
        console.log(err);
      })
  }

  return (
    <div>
      <h1 className={title()}>Login Page</h1>
      <Spacer y="20px" />
      <Card className="w-[400px]">
        <CardBody>
          <Input
            className="w-400px"
            type="email"
            label="Email"
            isInvalid={isInvalid}
            placeholder="Enter your email"
            color={isInvalid ? "danger" : "success"}
            errorMessage={isInvalid && "Please enter a valid email"}
            onValueChange={setAccEmail}
          />
          <Spacer y="20px" />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your passaword"
            onValueChange={setAccPassword}
          />
        </CardBody>
      </Card>
	  <Spacer y="20px" />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={checkAccount}
      >
        Login
      </Button>
    </div>
  );
}
