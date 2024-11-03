import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const textTransform = {
  toTitleCase: (str: string) =>
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    ),
  toSentenceCase: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
  toPascalCase: (str: string) =>
    str.replace(
      /(\w)(\w*)/g,
      (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
    ),
  toSnakeCase: (str: string) =>
    str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase(),
  toCamelCase: (str: string) =>
    str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
  toKebabCase: (str: string) =>
    str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
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
  create: () => new Date().toISOString(),
  toTime: (date: string) => new Date(date).getTime(),
  toLocaleString: (date: string) => new Date(date).toLocaleString(),
  toLocaleTimeString: (date: string) => new Date(date).toLocaleTimeString(),
  toLocaleDateString: (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },
  extractDateAndTime: (date: string, hourFormat: "12" | "24" = "24") => {
    const [datestamp, timestamp] = date.split("T");
    const [hour, minute] = timestamp.split(":");
    const dateObj = new Date(datestamp);

    function getHourString(hour: string) {
      if (hourFormat === "24") return hour;

      const hourInt = parseInt(hour);

      switch (true) {
        case hourInt === 0:
          return "12";
        case hourInt > 12:
          return String(hourInt - 12);
        default:
          return hour;
      }
    }

    const time = `${getHourString(hour)}:${minute}`;

    return { date: dateObj, time };
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
