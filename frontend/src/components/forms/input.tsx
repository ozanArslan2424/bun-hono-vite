import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, EyeClosedIcon, EyeIcon } from "lucide-react";
import * as React from "react";

type DefaultOmittedProps<T> = Omit<T, "type" | "name" | "id">;

type DefaultInputProps = React.ComponentProps<"input">;

export type InputProps = {
  id: string;
  name: string;
  label?: string;
  description?: string;
  error?: string[];
  type?: React.HTMLInputTypeAttribute;
  passwordAutoVisible?: boolean;
} & DefaultOmittedProps<DefaultInputProps>;

export function Input({ type = "text", label, description, error, passwordAutoVisible, ...props }: InputProps) {
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

  React.useEffect(() => {
    if (passwordAutoVisible) {
      setControlledType("text");
      setTimeout(() => {
        setControlledType("password");
      }, 1500);
    }
  }, [passwordAutoVisible]);

  const autoComplete = React.useMemo(() => {
    const getAutoComplete = (type: React.HTMLInputTypeAttribute): React.HTMLInputAutoCompleteAttribute => {
      if (props.autoComplete) return props.autoComplete;
      if (type === "email") return "email";
      if (type === "password") return "current-password";
      return "off";
    };
    return getAutoComplete(type);
  }, [type, props.autoComplete]);

  if (type === "checkbox") {
    return (
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            props.className,
          )}
        >
          <input
            {...props}
            type="checkbox"
            className="peer sr-only"
            autoComplete="off"
            aria-hidden="true"
            aria-label={label}
          />
          <div className={cn("flex items-center justify-center text-current")}>
            <CheckIcon className="h-4 w-4" />
          </div>
        </div>
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error && "text-red-500",
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={props.id} className="flex flex-col gap-1.5">
          <span className={cn("text-sm font-semibold leading-none", error && "text-red-500")}>{label}</span>
          {description && <span className="text-sm font-medium leading-none text-muted-foreground">{description}</span>}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          {...props}
          type={controlledType}
          className={cn(
            "border-input flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:border-amber-500",
            type === "file" &&
              "cursor-pointer file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground active:scale-95",
            props.readOnly && "cursor-not-allowed border-muted text-muted-foreground",
            props.className,
          )}
          autoComplete={autoComplete}
        />
        {type === "password" && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "h-10 max-h-10 min-h-10 w-10 max-w-10 shrink-0",
              controlledType === "text" && "bg-secondary/50",
            )}
            onClick={switchTypeForPassword}
          >
            {controlledType === "password" ? <EyeClosedIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </Button>
        )}
      </div>
      {error && <span className="text-sm font-medium leading-none text-red-500">{error}</span>}
    </div>
  );
}
