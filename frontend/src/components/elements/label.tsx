import * as React from "react";
import { cn } from "@/lib/utils";

type LabelPrimitiveProps = React.ComponentPropsWithoutRef<"label">;
type ErrorLabelProps = LabelPrimitiveProps & { errors: string[] };
type LabelRef = React.ComponentRef<"label">;

const Label = React.forwardRef<LabelRef, LabelPrimitiveProps>((props, ref) => {
  return (
    <label
      {...props}
      ref={ref}
      className={cn("text-foreground/80 text-sm font-medium leading-none", props.className)}
    />
  );
});

const ErrorLabel = React.forwardRef<LabelRef, ErrorLabelProps>((props, ref) => {
  return (
    <label
      {...props}
      ref={ref}
      className={cn("px-0.5 text-sm font-medium leading-none text-red-500", props.className)}
    >
      {props.errors.map((error) => error).join(" ")}
    </label>
  );
});

const DescriptionLabel = React.forwardRef<LabelRef, LabelPrimitiveProps>((props, ref) => {
  return (
    <label
      {...props}
      ref={ref}
      className={cn("text-foreground/60 text-xs font-medium leading-none", props.className)}
    />
  );
});

Label.displayName = "Label";
ErrorLabel.displayName = "ErrorLabel";
DescriptionLabel.displayName = "DescriptionLabel";

export { Label, ErrorLabel, DescriptionLabel };
