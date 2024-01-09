import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";

export default function Home() {
  //This is Just Demo data before having API just to check the UI
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Card className="max-w-[1250px]">
        <CardHeader className="flex gap-3 ">
          <div className="flex flex-col">
            <div className="text-4xl text-cyan-500">For Sale</div>
            <div className="text-6xl">Feature Products</div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-4 grid-rows-4 gap-5 text-xl max-w-[1250px]">
            <Card className="w-[250px] h-[250px] bg-gradient-to-r from-cyan-500 to-blue-500">
              <CardHeader>
                <h1 className="text-lg text-amber-200">Siu chung cu cua PhucNVM</h1>
              </CardHeader>
              <CardBody>
                <Image
                  removeWrapper
                  alt="hinh1"
                  width="100%"
                  height="100%"
                  className="z-0 w-full h-full object-cover"
                  src="./demo.png"
                />
                <CardFooter className="justify-center">
                  <p className="text-sm">10ty/can</p>
                </CardFooter>
              </CardBody>
            </Card>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
            <div className="w-[100] h-[100] bg-gradient-to-r from-cyan-500 to-blue-500">
              This is testing
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <p>Day la footer coi nhu the nao</p>
        </CardFooter>
      </Card>
    </section>
  );
}
