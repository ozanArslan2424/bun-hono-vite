import { cn } from "@/lib/utils";
import { useState } from "react";

type CheckboxProps = React.ComponentProps<"input"> & {
  label?: string;
  errors?: string[];
};

export function Checkbox({ label, errors, ...rest }: CheckboxProps) {
  const [checked, setChecked] = useState(false);
  return (
    <label className="flex w-max cursor-pointer flex-col gap-0.5 px-1">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={cn(
            "aspect-square h-3 w-3 rounded-sm outline-none ring-1 ring-offset-2 transition duration-100 focus-visible:ring-2",
            checked && "bg-primary",
          )}
          role="checkbox"
          aria-checked={checked}
          aria-label={label}
          onClick={() => setChecked(!checked)}
        ></button>
        <input {...rest} type="checkbox" className="hidden" checked={checked} />
        {label && <span className="label-text">{label}</span>}

        {errors && errors.length > 0 && (
          <span className="error-text">
            {errors.map((error) => error + " ")}
          </span>
        )}
      </div>
    </label>
  );
}
