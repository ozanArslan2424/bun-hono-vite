import * as React from "react";

import { cn } from "@/lib/utils";
import { DescriptionLabel, ErrorLabel, Label } from "./label";

export type TextareaProps = {
  id: string;
  name: string;
  label?: string;
  description?: string;
  errors?: string[];
} & React.ComponentPropsWithoutRef<"textarea">;

export type TextareaRef = React.ComponentRef<"textarea">;

const Textarea = React.forwardRef<TextareaRef, TextareaProps>((props, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
      <textarea
        {...props}
        ref={ref}
        className={cn(
          "bg-background text-foreground border-primary/50 flex min-h-20 w-full items-center rounded-md border px-3 transition",
          "placeholder:text-muted-foreground",
          "focus-visible:border-primary focus-visible:outline-none",
          props.errors && "border-danger/80 focus-visible:border-warning/60",
          props.readOnly && "border-muted text-muted-foreground cursor-not-allowed",
          props.disabled && "pointer-events-none opacity-50",
          props.className
        )}
      />
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

Textarea.displayName = "Textarea";

export { Textarea };
