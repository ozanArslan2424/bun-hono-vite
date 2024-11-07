import { cn } from "@/lib/utils";
import * as React from "react";
import { DescriptionLabel, ErrorLabel, Label } from "./label";

export type SelectProps = {
  label?: string;
  description?: string;
  errors?: string[];
} & React.ComponentPropsWithoutRef<"select">;

export type SelectRef = React.ComponentRef<"select">;

const Select = React.forwardRef<SelectRef, SelectProps>((props, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
      <select
        {...props}
        ref={ref}
        className={cn(
          "bg-background text-foreground border-primary/50 flex h-10 w-full items-center rounded-md border px-3 transition",
          "placeholder:text-muted-foreground",
          "focus-visible:border-primary focus-visible:outline-none",
          props.errors && "border-danger/80 focus-visible:border-warning/60",
          props.disabled && "pointer-events-none opacity-50",
          props.className
        )}
      >
        {props.children}
      </select>
      {props.errors ? (
        <ErrorLabel htmlFor={props.id} errors={props.errors} />
      ) : (
        props.description && (
          <DescriptionLabel htmlFor={props.id}>{props.description}</DescriptionLabel>
        )
      )}
    </div>
  );
});

Select.displayName = "Select";

export { Select };
