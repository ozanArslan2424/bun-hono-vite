import { Button } from "@/components/elements/button";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import type {
  HTMLInputTypeAttribute,
  HTMLInputAutoCompleteAttribute,
  ComponentPropsWithoutRef,
  ComponentRef,
} from "react";
import { forwardRef, useState, useMemo } from "react";
import { DescriptionLabel, ErrorLabel, Label } from "../label";

export type InputProps = {
  label?: string;
  description?: string;
  errors?: string[];
} & ComponentPropsWithoutRef<"input">;

export type InputRef = ComponentRef<"input">;

export const StringInput = forwardRef<InputRef, InputProps>((props, ref) => {
  const [currentType, setCurrentType] = useState<HTMLInputTypeAttribute>(props.type || "text");

  function switchTypeForPassword() {
    setCurrentType((prev) => {
      if (props.type !== "password") return prev;
      const newType = prev === "password" ? "text" : "password";

      if (newType === "text") {
        setTimeout(() => {
          setCurrentType("password");
        }, 1500);
      }

      return newType;
    });
  }

  const autoComplete = useMemo(() => {
    const getAutoComplete = (type?: HTMLInputTypeAttribute): HTMLInputAutoCompleteAttribute => {
      if (props.autoComplete) return props.autoComplete;
      if (type === "email") return "email";
      if (type === "password") return "current-password";
      if (type === "tel") return "tel";
      return "off";
    };
    return getAutoComplete(props.type);
  }, [props.type, props.autoComplete]);

  return (
    <div className={cn("flex flex-col gap-1.5")}>
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}

      <div className="flex items-center gap-1.5">
        <input
          {...props}
          ref={ref}
          type={currentType as HTMLInputTypeAttribute}
          autoComplete={autoComplete}
          className={cn(
            "bg-background text-foreground border-border flex h-10 w-full items-center rounded-md border px-3 transition",
            "placeholder:text-muted-foreground",
            "focus-visible:border-primary focus-visible:outline-none",
            props.errors && "border-danger/80 focus-visible:border-warning/60",
            props.readOnly && "border-muted text-muted-foreground cursor-not-allowed",
            props.disabled && "pointer-events-none opacity-50",
            props.className
          )}
        />
        {props.type === "password" && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn("h-10 w-10", props.errors && "border-danger/80")}
            onClick={switchTypeForPassword}
            aria-label="Toggle password visibility"
          >
            {currentType === "password" ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
            <span className="sr-only">Toggle password visibility</span>
          </Button>
        )}
      </div>
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

StringInput.displayName = "StringInput";
