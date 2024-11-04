import { InputProps } from "@/components/forms/input";
import { ButtonHTMLAttributes, useState } from "react";
import { SafeParseReturnType, ZodTypeAny } from "zod";

type UseFormOptions<T> = {
  fields?: { [key in keyof T]?: Omit<InputProps, "id" | "name" | "errors"> };
  afterSubmitSuccess?: () => void | Promise<void>;
};

export function useForm<T>(schema: ZodTypeAny, options?: UseFormOptions<T>) {
  type Errors = { _root?: string[] } & { [key in keyof T]?: string[] };
  type ParseResult = SafeParseReturnType<T, T>;

  const [errors, setErrors] = useState<Errors>({});
  const [isPending, setIsPending] = useState<boolean>(false);

  function safeSubmit(
    e: React.FormEvent<HTMLFormElement>,
    onSuccess: (safeParseData: T) => void | Promise<void>,
    onFail?: (errors: Errors) => void | Promise<void>
  ) {
    e.preventDefault();
    e.stopPropagation();

    if (isPending) return;

    try {
      setIsPending(true);
      setErrors({});

      const formData = new FormData(e.currentTarget);
      const values = Object.fromEntries(formData);
      const parseResult: ParseResult = schema.safeParse(values);

      if (parseResult.error) {
        const errors = parseResult.error.flatten().fieldErrors as Errors;
        setErrors(errors);
        onFail?.(errors);
        return;
      }

      onSuccess(parseResult.data);
    } finally {
      setIsPending(false);
      options?.afterSubmitSuccess?.();
    }
  }

  function field(name: keyof T): InputProps {
    const defaults = {
      id: String(name),
      name: String(name),
      errors: errors[name],
    };

    if (options && options.fields && options.fields[name]) {
      return { ...defaults, ...options.fields[name] };
    }

    return defaults;
  }

  function button(type: ButtonHTMLAttributes<HTMLButtonElement>["type"] = "submit") {
    return { type, isPending };
  }

  function setFieldErrors(errors: Errors) {
    setErrors((prev) => ({ ...prev, ...errors }));
  }

  function setRootError(message: string) {
    setErrors((prev) => ({ ...prev, _root: [message] }));
  }

  return { errors, isPending, safeSubmit, field, button, setFieldErrors, setRootError };
}
