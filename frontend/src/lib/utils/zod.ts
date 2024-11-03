import { z } from "zod";

export const ISO_DATETIME_REGEX =
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

export const isoDateString = z
  .string()
  .regex(ISO_DATETIME_REGEX, "Invalid date format.");
