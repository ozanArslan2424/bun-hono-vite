import * as React from "react";

import { cn } from "@/lib/utils";

type LabelProps = {
  error?: string[];
} & React.ComponentProps<"label">;

export function Label({ error, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        error && "text-red-500",
        props.className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
