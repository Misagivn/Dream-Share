"use client";
import React from "react";

import axios, { Axios } from "axios";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const baseURL = "https://6548b3e4dd8ebcd4ab236ce6.mockapi.io/Nhanvien";

export default function Home() {
  //This is Just Demo data before having API just to check the UI

  //tạo các biến để sử dụng co các hàm dưới
  const [post, setPost] = React.useState(null);
  const [emailValue, setValue] = React.useState("myemail@email.com");

  //Hàm này để check format của Email có đúng hay là không
  const validateEmail = (emailValue: string) =>
    emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const phonePattern = /^0[0-9]{7,9}$/;

  const isInvalid = React.useMemo(() => {
    if (emailValue === "") return false;

    return validateEmail(emailValue) ? false : true;
  }, [emailValue]);

  //Demo - thử làm hàm tạo nhân viên API
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  });

  function createNhanVien() {
    axios
      .post(`${baseURL}/1`, {
        emailValue,
        name: "default",
        phon: "testAPI",
      })
      .then((response) => {
        console.log(response);
        // Handle response
      });
  }

  if (!post) return "No post!";

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-3xl">Test demo API:</h1>
      <p>{post.gender}</p>
      <p>{post.email}</p>
      <form action="" id="login" method="post" onSubmit={createNhanVien}>
        <Input
          value={emailValue}
          type="email"
          label="Email"
          variant="bordered"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "success"}
          errorMessage={isInvalid && "Please enter a valid email"}
          onValueChange={setValue}
          className="max-w-xs"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </section>
  );
}
