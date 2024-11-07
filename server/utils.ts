import { integer, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

type EnumValues = [string, ...string[]];

// * zod iso helper
export const ISO_DATETIME_REGEX =
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
export const isoDateString = z.string().regex(ISO_DATETIME_REGEX, "Invalid date format.");
// check if file is instance of File and under 10MB
export const zFile = (fieldName: string, maxSize?: number, message?: string) =>
  z.instanceof(File).refine(
    (file) => {
      if (maxSize) {
        return file.size <= maxSize;
      }
      return true;
    },
    { message: message, path: [fieldName] }
  );

// * Data types for sqlite drizzle-orm
export const date = (name: string) => integer(name, { mode: "timestamp" });
export const number = (name: string) => integer(name, { mode: "number" });
export const boolean = (name: string) => integer(name, { mode: "boolean" });
export const enumLite = (name: string, values: EnumValues) => text(name, { enum: values });
export const json = (name: string) => text(name, { mode: "json" });

// * Error messages
export function getErrorMessage(error: unknown) {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  console.error("Caught Error:", message);
  return message;
}

export function findNullMessage(items: { obj: any; message: string }[]): string | undefined {
  for (const item of items) {
    if (isFalsy(item.obj)) {
      return item.message;
    }
  }
  return undefined;
}

export function isFalsy(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    value === false ||
    value === 0 ||
    value.length === 0
  );
}
