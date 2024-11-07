import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const textTransform = {
  toTitleCase: (str: string) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
  toSentenceCase: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
  toPascalCase: (str: string) =>
    str.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase()),
  toSnakeCase: (str: string) => str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase(),
  toCamelCase: (str: string) => str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
  toKebabCase: (str: string) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
  toAllCaps: (str: string) => str.toUpperCase(),
  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
  removeSpaces: (str: string) => str.replace(/\s/g, ""),
  removeExtraSpaces: (str: string) => str.replace(/\s+/g, " "),
  removeLeadingTrailingSpaces: (str: string) => str.trim(),
  // if there are non-alphanumeric characters, they will be replaced with spaces and each word will be capitalized
  toTitleCaseStrict: (str: string) =>
    str
      .replace(/[^a-zA-Z0-9]/g, " ")
      .split(" ")
      .map((word) => textTransform.toTitleCase(word))
      .join(" "),
};

export const timestamp = {
  // convert a date string to a Date object return example: "Wed Sep 01 2021 00:00:00 GMT+0000 (Coordinated Universal Time)"
  toDate: (date: string) => new Date(date),
  // convert a date string to an ISO string return example: "2021-09-01T00:00:00.000Z"
  toISO: (date: string) => new Date(date).toISOString(),
  // convert a date string to a human-readable string returns example: "Sep 1, 2021"
  toReadable: (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  // convert a date string to milliseconds return example: 1630454400000
  toTime: (date: string) => new Date(date).getTime(),
  // get the current date as a Date return example: "Wed Sep 01 2021 00:00:00 GMT+0000 (Coordinated Universal Time)"
  newDate: () => new Date(),
  // get the current date as an ISO string return example: "2021-09-01T00:00:00.000Z"
  newISO: () => new Date().toISOString(),
  // get the current date as a human-readable string returns example: "Sep 1, 2021"
  newReadable: () =>
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  // how many days ago
  howManyDaysAgo: (date: string) => {
    const now = new Date();
    const created = new Date(date);
    const diff = now.getTime() - created.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function repeat<T>(times: number, callback: (index: number) => T) {
  return Array.from({ length: times }, (_, index) => callback(index));
}

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
