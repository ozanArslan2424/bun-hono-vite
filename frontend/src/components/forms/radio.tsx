import { cn } from "@/lib/utils";
import { createContext, useContext, useMemo, useState } from "react";

type RadioGroup = React.ComponentProps<"div"> & {
  defaultValue: React.InputHTMLAttributes<HTMLInputElement>["defaultValue"];
  name: React.InputHTMLAttributes<HTMLInputElement>["name"];
  id: React.InputHTMLAttributes<HTMLInputElement>["id"];
  error?: string[];
  children: React.ReactNode;
};
type RadioOption = React.ComponentProps<"input"> & {
  label: string;
  value: React.InputHTMLAttributes<HTMLInputElement>["value"];
  id: React.InputHTMLAttributes<HTMLInputElement>["id"];
};

type RadioContextType = {
  defaultValue: React.InputHTMLAttributes<HTMLInputElement>["defaultValue"];
  error?: string[];
  name: React.InputHTMLAttributes<HTMLInputElement>["name"];
  selectedValue: React.InputHTMLAttributes<HTMLInputElement>["value"];
  setSelectedValue: React.Dispatch<React.SetStateAction<React.InputHTMLAttributes<HTMLInputElement>["value"]>>;
} | null;

const RadioContext = createContext<RadioContextType>(null);

export function RadioGroup(props: RadioGroup) {
  const [selectedValue, setSelectedValue] = useState(props.defaultValue);

  return (
    <RadioContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        defaultValue: props.defaultValue,
        error: props.error,
        name: props.name,
      }}
    >
      <div {...props} className={cn("flex items-center", props.className)}>
        {props.children}
      </div>
    </RadioContext.Provider>
  );
}

export function RadioOption(props: RadioOption) {
  const context = useContext(RadioContext);
  if (!context) throw new Error("RadioOption can only be used inside a RadioGroup!!!");

  const defaultChecked = useMemo(() => context.defaultValue === props.value, [context.defaultValue, props.value]);
  const checked = useMemo(() => context.selectedValue === props.value, [context.selectedValue, props.value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!context) return;
    if (e.target.checked) {
      context.setSelectedValue(e.target.value);
    }
  }

  return (
    <label
      className={cn(
        checked ? "bg-accent text-accent-foreground" : "bg-background text-foreground",
        "border-input flex h-10 w-full cursor-pointer items-center justify-center border px-3 py-2 font-semibold transition first:rounded-l-md last:rounded-r-md",
        "focus-within:border-primary focus-within:outline-none",
        "focus-visible:border-primary focus-visible:outline-none",
        context.error && "border-destructive peer-focus-visible:border-amber-500",
        props.disabled && "cursor-not-allowed opacity-50",
        props.className,
      )}
      htmlFor={props.id}
    >
      {props.label}
      <input
        {...props}
        type="radio"
        defaultChecked={defaultChecked}
        name={context.name}
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
}
