import { useState } from "react";
import { SafeParseReturnType, ZodTypeAny } from "zod";

export function useForm<T>(
  schema: ZodTypeAny,
  options: {
    initialErrors: { [key in keyof T]?: string[] };
  } = {
    initialErrors: {},
  },
) {
  type Errors = { [key in keyof T]?: string[] };
  type ParseResult = SafeParseReturnType<T, T>;

  const [errors, setErrors] = useState<Errors>(options.initialErrors);
  const [isPending, setIsPending] = useState(false);

  function field(name: keyof T): {
    id: string;
    name: string;
    error: string[] | undefined;
  } {
    return {
      id: name as string,
      name: name as string,
      error: errors[name],
    };
  }

  function setFieldErrors(errors: Errors) {
    setErrors((prev) => ({ ...prev, ...errors }));
  }

  function safeAction(formData: FormData, action: (safeParseData: T) => void) {
    setIsPending(true);

    const values = Object.fromEntries(formData);
    const parseResult: ParseResult = schema.safeParse(values);

    if (parseResult.error) {
      const errors = parseResult.error.flatten().fieldErrors as Errors;
      setErrors(errors);
      setIsPending(false);
      return;
    }

    setErrors({});
    action(parseResult.data);
    setIsPending(false);
    return;
  }

  return { errors, isPending, safeAction, field, setFieldErrors };
}
