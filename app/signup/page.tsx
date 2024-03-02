"use client";
import { useState } from "react";
import axios from "axios";

import {
  Button,
  Container,
  Errormessage,
  Formcontrol,
  H1,
  Labelcontrol,
  Wrapper,
} from "./page.styled";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [hasLength, setHasLength] = useState(false);
  const [hasLetter, setHasLetter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (!validateEmail(event.target.value)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.trim() === "") {
      setNameError("Name cannot be empty");
    } else {
      setNameError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // Check each condition
    setHasLength(value.length >= 8);
    setHasLetter(/[a-zA-Z]/.test(value));
    setHasNumber(/\d/.test(value));
    setHasSpecialChar(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value));
  };

  const handleAgreedToTermsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgreedToTerms(e.target.checked);
  };

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!agreedToTerms) {
      alert(
        "You must agree to the Terms of Service and Privacy Policy to create an account."
      );
      return;
    }
  };

  const accountData = {
    email: "email",
    password: "password",
    // ... other account data
  };
  async function handleCreateAccount(email: string, password: string) {
    try {
      const response = await axios.post(
        "https://65cd13f5dd519126b8401401.mockapi.io/signin",
        accountData
      );
      console.log(response.data);
      alert("Account created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create account.");
    }
  }

  return (
    <>
      <H1>Sign Up</H1>
      <Wrapper>
        <Container>
          <Labelcontrol htmlFor="user_name">* Name</Labelcontrol>
          <Formcontrol
            id="user_name"
            type="text"
            placeholder="E.g. John Appleseed"
            name="first_name"
            required={true}
            tabIndex={1}
            value={name}
            onChange={handleNameChange}
          ></Formcontrol>
          {nameError && <Errormessage>Name is required</Errormessage>}
        </Container>
        <Container>
          <Labelcontrol htmlFor="user_email">* Email</Labelcontrol>
          <Formcontrol
            id="user_email"
            type="email"
            placeholder="E.g. john@appleseed.com"
            name="email"
            required={true}
            tabIndex={2}
            value={email}
            onChange={handleEmailChange}
          ></Formcontrol>
          {emailError && <Errormessage>Email is invalid</Errormessage>}
        </Container>
        <Container>
          <Labelcontrol htmlFor="user_password">* Password</Labelcontrol>
          <Formcontrol
            id="user_password"
            type="password"
            placeholder="E.g. password"
            name="password"
            required={true}
            tabIndex={3}
            value={password}
            onChange={handlePasswordChange}
          ></Formcontrol>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ul>
              <li style={{ color: hasLength ? "green" : "red" }}>
                {hasLength ? "✔" : "✖"} Minimum 8 characters
              </li>
              <li style={{ color: hasLetter ? "green" : "red" }}>
                {hasLetter ? "✔" : "✖"} Contains a letter
              </li>
            </ul>
            <ul>
              <li style={{ color: hasNumber ? "green" : "red" }}>
                {hasNumber ? "✔" : "✖"} Contains a number
              </li>
              <li style={{ color: hasSpecialChar ? "green" : "red" }}>
                {hasSpecialChar ? "✔" : "✖"} Contains a special character
              </li>
            </ul>
          </div>
        </Container>
        <div>
          <input
            type="checkbox"
            id="agreed_to_terms"
            checked={agreedToTerms}
            onChange={handleAgreedToTermsChange}
            style={{ borderRadius: "3px", background: "#303034" }}
          />
          <label htmlFor="agreed_to_terms" style={{ marginLeft: "10px" }}>
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </label>
        </div>
        <Button
          tabIndex={4}
          onClick={() => {
            handleCreateAccount;
          }}
        >
          Create Account
        </Button>
      </Wrapper>
    </>
  );
};

export default SignUpPage;
