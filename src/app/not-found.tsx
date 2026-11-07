"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex gap-8 justify-center items-center">
        <h1 className="text-8xl text-primary font-bold flex justify-center items-center">
          404
        </h1>
        <Separator orientation="vertical" />
        <div className="flex flex-col max-w-sm gap-4 justify-center items-center">
          <h2 className="text-4xl font-bold">Page not found</h2>
          <p className="text-xl font-semibold">"Bono, my tyres are gone"</p>
          <a
            href={"/"}
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            <ArrowLeftIcon data-icon="inline-start" />
            <span>Return Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}
