import { Button } from "@/components/elements/button";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import * as React from "react";

export type InputProps = {
  id: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  errors?: string[];
} & Omit<React.ComponentProps<"input">, "type" | "name" | "id">;

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, name, type = "text", label, errors, className, ...rest } = props;

  const [controlledType, setControlledType] = React.useState<React.HTMLInputTypeAttribute>(type);

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

  const autoComplete = React.useMemo(() => {
    const getAutoComplete = (type: React.HTMLInputTypeAttribute): React.HTMLInputAutoCompleteAttribute => {
      if (props.autoComplete) return props.autoComplete;
      if (type === "email") return "email";
      if (type === "password") return "current-password";
      if (type === "tel") return "tel";
      return "off";
    };
    return getAutoComplete(type);
  }, [type, props.autoComplete]);

  return (
    <div className={cn("relative flex flex-col gap-1", label && "pt-2")}>
      {label && (
        <label htmlFor={id} className="bg-background absolute left-1.5 top-0 px-1.5 text-xs font-medium leading-none">
          {label}
        </label>
      )}
      <div className="flex items-center gap-1.5">
        <input
          {...rest}
          ref={ref}
          id={id}
          name={name}
          type={controlledType as React.HTMLInputTypeAttribute}
          autoComplete={autoComplete}
          className={cn(
            "bg-background text-foreground border-primary/50 flex h-10 w-full items-center rounded-md border px-3 transition",
            "placeholder:text-muted-foreground",
            "focus-visible:border-primary focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "file:border-primary/20 file:text-foreground file:my-1 file:cursor-pointer file:rounded-md file:border file:bg-transparent file:px-3 file:py-1 file:text-sm file:font-medium",
            type === "file" && "h-14 py-2 text-sm",
            errors && "border-danger/80 focus-visible:border-warning/60",
            props.readOnly && "border-muted text-muted-foreground cursor-not-allowed",
            className
          )}
        />
        {type === "password" && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn("h-10 w-10", errors && "border-danger/80")}
            onClick={switchTypeForPassword}
            aria-label="Toggle password visibility"
          >
            {controlledType === "password" ? <EyeClosedIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </Button>
        )}
      </div>
      {errors && (
        <span className="text-danger px-0.5 text-sm font-medium leading-none">
          {errors.map((error) => error).join(" ")}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";
