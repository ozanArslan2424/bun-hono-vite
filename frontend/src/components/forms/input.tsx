import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import * as React from "react";

type TypeProps = Omit<React.ComponentProps<"input">["type"], "checkbox" | "radio">;

type DefaultInputProps = Omit<React.ComponentProps<"input">, "type" | "name" | "id">;

export type InputProps = {
  id: string;
  name: string;
  label?: string;
  description?: string;
  errors?: string[];
  type?: TypeProps;
  passwordAutoVisible?: boolean;
} & DefaultInputProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type = "text", label, description, errors, passwordAutoVisible, ...rest } = props;

  const [controlledType, setControlledType] = React.useState<TypeProps>(type);

  function switchTypeForPassword() {
    setControlledType((prev) => {
      if (type !== "password") return prev;
      const newType = prev === "password" ? "text" : "password";

      if (newType === "text") {
        setTimeout(() => {
          setControlledType("password");
        }, 1500);
      }

      return newType;
    });
  }

  React.useEffect(() => {
    if (passwordAutoVisible) {
      setControlledType("text");
      setTimeout(() => {
        setControlledType("password");
      }, 1500);
    }
  }, [passwordAutoVisible]);

  const autoComplete = React.useMemo(() => {
    const getAutoComplete = (type: TypeProps): React.HTMLInputAutoCompleteAttribute => {
      if (props.autoComplete) return props.autoComplete;
      if (type === "email") return "email";
      if (type === "password") return "current-password";
      return "off";
    };
    return getAutoComplete(type);
  }, [type, props.autoComplete]);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={props.id} className="flex flex-col gap-1.5">
          <span className={cn("text-sm font-semibold leading-none", errors && "text-red-500")}>{label}</span>
          {description && <span className="text-muted-foreground text-sm font-medium leading-none">{description}</span>}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          {...rest}
          ref={ref}
          type={controlledType as React.HTMLInputTypeAttribute}
          className={cn(
            "bg-backgorund text-foreground",
            "flex h-10 w-full rounded-md border px-3 py-2 text-sm transition",
            "placeholder:text-muted-foreground",
            "focus-visible:border-primary/50 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            errors && "border-destructive focus-visible:border-amber-500",
            type === "file" &&
              "file:text-foreground active:bg-background active:text-foreground cursor-pointer file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium",
            props.readOnly && "border-muted text-muted-foreground cursor-not-allowed",
            props.className
          )}
          autoComplete={autoComplete}
        />
        {type === "password" && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 max-h-10 min-h-10 w-10 max-w-10 shrink-0"
            onClick={switchTypeForPassword}
          >
            {controlledType === "password" ? <EyeClosedIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </Button>
        )}
      </div>
      {errors && (
        <span className="text-sm font-medium leading-none text-red-500">{errors.map((error) => error).join(" ")}</span>
      )}
    </div>
  );
});

Input.displayName = "Input";
