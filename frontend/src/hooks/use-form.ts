import { CombinedInputProps } from "@/components/elements/input-types";
import { getErrorMessage } from "@/lib/utils";
import { useState } from "react";
import { SafeParseReturnType, ZodTypeAny } from "zod";

type UseFormOptions<T> = {
  fields?: { [key in keyof T]?: Omit<CombinedInputProps, "id" | "name" | "errors"> };
  afterSubmitSuccess?: () => void | Promise<void>;
  afterSubmitError?: (
    errors: { _root?: string[] } & { [key in keyof T]?: string[] }
  ) => void | Promise<void>;
};

export function useForm<T>(schema: ZodTypeAny, options?: UseFormOptions<T>) {
  type Errors = { _root?: string[] } & { [key in keyof T]?: string[] };
  type ParseResult = SafeParseReturnType<T, T>;

  const [errors, setErrors] = useState<Errors>({});

  function safeSubmit(
    e: React.FormEvent<HTMLFormElement>,
    onSuccess: (safeParseData: T) => void | Promise<void>
  ) {
    e.preventDefault();
    e.stopPropagation();
    setErrors({});

    try {
      const formData = new FormData(e.currentTarget);
      const values = fixFiles(formData);
      const parseResult: ParseResult = schema.safeParse(values);

      if (parseResult.error) {
        const errors = parseResult.error.flatten().fieldErrors as Errors;
        setErrors(errors);
        options?.afterSubmitError?.(errors);
        return;
      }

      onSuccess(parseResult.data);
    } catch (error) {
      const message = getErrorMessage(error);
      setRootError(message);
      options?.afterSubmitError?.(errors);
    } finally {
      options?.afterSubmitSuccess?.();
    }
  }

  function field(name: keyof T): CombinedInputProps {
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

  function setFieldErrors(errors: Errors) {
    setErrors((prev) => ({ ...prev, ...errors }));
  }

  function setRootError(message: string) {
    setErrors((prev) => ({ ...prev, _root: [message] }));
  }

  return { errors, safeSubmit, field, setFieldErrors, setRootError };
}

function fixFiles(formData: FormData) {
  const values = Object.fromEntries(formData);
  const fixedValues = Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      if (value instanceof File) {
        if (value.size === 0 || value.name === "") {
          return [key, undefined];
        } else {
          return [key, value];
        }
      } else {
        return [key, value];
      }
    })
  );

  return fixedValues;
}
