import { cn } from "@/lib/utils";
import * as React from "react";

type ProProps = {
  total: number;
  value: number;
} & React.ComponentProps<"progress">;

const Progress = ({ total, value, children, className, ...props }: ProProps) => {
  return (
    <progress
      value={value}
      max={total}
      className={cn(
        "overflow-clip",
        "[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg",
        "[&::-moz-progress-bar]:bg-muted [&::-webkit-progress-bar]:bg-muted",
        "[&::-webkit-progress-value]:bg-muted-foreground",
        className,
      )}
      {...props}
    >
      {children ? children : Math.round((value / total) * 100)}%
    </progress>
  );
};

export { Progress };
