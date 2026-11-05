"use client";

import { Button } from "@/components/ui/button";

function onClick() {
  alert("Button was clicked!");
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold">Hello World!</h1>
      <Button onClick={onClick}>Click me</Button>
    </div>
  );
}
