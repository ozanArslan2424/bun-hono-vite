import { cn } from "@/lib/utils";
import * as React from "react";

export type SelectProps = {
  id: string;
  name: string;
  children: React.ReactNode;
  label?: string;
  errors?: string[];
} & Omit<React.ComponentProps<"select">, "name" | "id" | "children">;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { id, name, label, errors, className, children, ...rest } = props;

  return (
    <div className={cn("relative flex flex-col gap-1", label && "pt-2")}>
      {label && (
        <label htmlFor={id} className="bg-background absolute left-1.5 top-0 px-1 text-xs font-medium leading-none">
          {label}
        </label>
      )}
      <select
        {...rest}
        ref={ref}
        id={id}
        name={name}
        className={cn(
          "bg-background text-foreground border-primary/50 flex h-10 w-full items-center rounded-md border px-3 transition",
          "placeholder:text-muted-foreground",
          "focus-visible:border-primary focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          errors && "border-danger/80 focus-visible:border-warning/60",
          className
        )}
      >
        {children}
      </select>
      {errors && (
        <span className="text-danger px-0.5 text-sm font-medium leading-none">
          {errors.map((error) => error).join(" ")}
        </span>
      )}
    </div>
  );
});

Select.displayName = "Select";
