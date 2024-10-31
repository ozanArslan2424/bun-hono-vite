import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = {
  id: string;
  name: string;
  label?: string;
  description?: string;
  error?: string[];
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, label, description, error, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={props.id} className="flex flex-col gap-1">
          <span className={cn("text-sm font-semibold leading-none", error && "text-red-500")}>{label}</span>
          {description && <span className="text-sm font-medium leading-none text-muted-foreground">{description}</span>}
        </label>
      )}
      <textarea
        {...props}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:border-amber-500",
          className,
        )}
      />
      {error && <span className="text-sm font-medium leading-none text-red-500">{error}</span>}
    </div>
  );
}
