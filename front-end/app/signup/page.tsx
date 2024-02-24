import { title } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function SignUpPage() {
  const variants = ["faded"];
  return (
    <div>
      <h1 className={title()}>Sign Up</h1>
      <Card
        className="mt-6 gap-4"
        style={{
          justifyContent: "center",
          width: "600px",
          height: "500px",
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
                    //variant={variant}
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
                    //variant={variant}
                    label="Password"
                    placeholder="Enter your password"
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
                    //variant={variant}
                    label="Confirm your password"
                    placeholder="Confirm password"
                    className="w-full h-35 px-4 ml-10 mr-10 mb-10"
                  />
                </div>
              ))}
            </div>{" "}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="w-60 h-10 gap-4" color="primary">
              Sign Up
            </Button>
          </div>
          <h1 className="w-full mt-4 gap-4" style={{ textAlign: "center" }}>
            Or
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a href="">
              <Button
                className="w-60 mt-4 h-10 gap-4"
                color="primary"
                variant="bordered"
              >
                Sign up with Google
              </Button>
            </a>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
