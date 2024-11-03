import { z } from "zod";

type ReturnType<T> = {
  success: boolean;
  data: T;
  errors?: { [key in keyof T]?: string[] | undefined };
};

export async function safeParse<T>(
  formData: FormData,
  schema: z.ZodTypeAny,
): Promise<ReturnType<T>> {
  const values = Object.fromEntries(formData);

  const parsed = schema.safeParse(values) as z.SafeParseReturnType<T, T>;

  if (parsed.error) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      data: values as T,
      errors: errors as { [key in keyof T]?: string[] | undefined },
    };
  }

  return {
    success: true,
    data: parsed.data,
  };
}
