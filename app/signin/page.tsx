"use client";

import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Formcontrol,
  H1,
  Labelcontrol,
  Wrapper,
  Button,
} from "./page.styled";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const validatePassword = (password: string) => {
    // This is a simple example, you should adjust the validation to meet your requirements
    return password.length >= 8;
  };
  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }

    if (!validatePassword(password)) {
      alert("Invalid password");
      return;
    }
  };
  async function login(email: string, password: string) {
    try {
      console.log(email, password);
      const response = await fetch(
        `https://65cd13f5dd519126b8401401.mockapi.io/signin`
      );

      if (!response.ok) {
        console.log("Login failed");
        return;
      }

      const users = await response.json();

      const user = users.find(
        (user: any) => user.email === email && user.password === password
      );

      if (user) {
        console.log("Login successful");
        // Here you might want to do something with the user, like saving the user token
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("An error occurred while trying to login:", error);
    }
  }
  return (
    <>
      <H1>Sign In</H1>
      <Wrapper>
        <Container>
          <Labelcontrol htmlFor="user_email">Your email</Labelcontrol>
          <Formcontrol
            id="user_email"
            type="email"
            placeholder="email@example.com"
            autoFocus={true}
            name="email"
            tabIndex={1}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Formcontrol>
        </Container>
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Labelcontrol htmlFor="user_password">Password</Labelcontrol>
            <a
              href="/forgot-password"
              style={{
                fontSize: "15px",
                fontWeight: "600",
                marginBottom: "5px",
                color: "hsl(212 100% 47% / 1)",
                fontStyle: "italic",
              }}
            >
              Forgot password?
            </a>
          </div>
          <Formcontrol
            id="user_password"
            type="password"
            placeholder="password"
            autoComplete="off"
            name="password"
            tabIndex={2}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Formcontrol>
        </Container>
        <Button tabIndex={3} onClick={() => login(email, password)}>
          Sign In
        </Button>
      </Wrapper>
    </>
  );
};

export default SignInPage;
