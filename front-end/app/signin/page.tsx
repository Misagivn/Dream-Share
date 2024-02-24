import React from "react";
import { title } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function SignInPage() {
  const variants = ["faded"];
  return (
    <div>
      <h1 className={title()}>Sign In</h1>
      <Card
        className="mt-6 gap-4"
        style={{
          justifyContent: "center",
          width: "600px",
          height: "600px",
        }}
      >
        <CardBody>
          <p>
            <div className="w-full flex flex-col gap-4">
              {variants.map((variant) => (
                <div
                  key={variant}
                  className="flex w-full flex-wrap md:flex-nowrap mt-6 md:mb-0 gap-4"
                >
                  <Input
                    type="email"
                    variant={variant}
                    label="Email"
                    placeholder="Enter your email"
                    className="w-full h-35 px-4 ml-10 mr-10 mb-10"
                  />
                </div>
              ))}
            </div>{" "}
          </p>
          <p>
            <div className="w-full flex flex-col gap-4">
              {variants.map((variant) => (
                <div
                  key={variant}
                  className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4"
                >
                  <Input
                    type="password"
                    variant={variant}
                    label="Password"
                    placeholder="Enter your password"
                    className="w-full h-35 px-4 ml-10 mr-10 mb-10"
                  />
                </div>
              ))}
            </div>{" "}
          </p>
          <Switch className="ml-14 mb-10 gap-4" defaultSelected>
            Remember me
          </Switch>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="w-60 h-10 gap-4" color="primary">
              Login
            </Button>
          </div>
          <h1
            className="w-full mt-10 gap-4"
            style={{ textAlign: "center", textDecoration: "underline" }}
          >
            <a href="">Forgot your password?</a>
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="w-60 mt-10 h-10 gap-4" color="primary">
              Continue with Google
            </Button>
          </div>
          <h1 className="w-full mt-4 gap-4" style={{ textAlign: "center" }}>
            Or
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a href="/signup">
              <Button
                className="w-60 mt-4 h-10 gap-4"
                color="primary"
                variant="bordered"
              >
                Sign Up
              </Button>
            </a>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
