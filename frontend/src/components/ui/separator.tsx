"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
} & React.ComponentPropsWithoutRef<"div">;

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <div
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  );
}
