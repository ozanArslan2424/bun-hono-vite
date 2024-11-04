import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { InputProps } from "./input";

export function Checkbox({ label, errors, defaultValue, defaultChecked, ...rest }: InputProps) {
  const [checked, setChecked] = useState(defaultValue === "on" || defaultChecked);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.checked = checked || false;
      ref.current.value = checked ? "on" : "off";
    }
  }, [checked]);

  return (
    <label className="flex w-max cursor-pointer flex-col gap-0.5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={cn(
            "grid aspect-square h-5 w-5 place-content-center rounded-md border outline-none transition duration-100 focus-visible:ring-2",
            checked ? "border-emerald-500/50" : "border-primary/50"
          )}
          role="checkbox"
          aria-checked={checked}
          aria-label={label}
          onClick={() => setChecked(!checked)}
        >
          <AnimatePresence>
            {checked && (
              <motion.span
                initial={{ opacity: 0, rotate: -360, scale: 0.1 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 360, scale: 0.1 }}
                transition={{ duration: 0.4 }}
                className="text-emerald-500"
              >
                <CheckIcon size={18} strokeWidth={4} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <input {...rest} type="checkbox" className="hidden" ref={ref} />
        {label && <span className="label-text">{label}</span>}
        {errors && errors.length > 0 && <span className="error-text">{errors.map((error) => error + " ")}</span>}
      </div>
    </label>
  );
}