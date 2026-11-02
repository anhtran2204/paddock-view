"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";

function onClick() {
  alert("Button was clicked!")
}

export default function Home() {
  return (
    <div className="flex flex-col gap-4 min-h-svh justify-center items-center">
      <h1 className="text-xl font-bold">Hello World!</h1>
      <Button onClick={onClick}>Click me!</Button>
    </div>
  );
}
