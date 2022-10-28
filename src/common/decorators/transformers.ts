import { TransformFnParams } from "class-transformer";
import { formatISO, isValid } from "date-fns";
import { randomId } from "../util";

/**
 * Transform an string date into ISOString. If the date is not valid it returns the same value
 */
export function toISOString(params: TransformFnParams): string {
  const isValidDate = isValid(new Date(params.value));
  if (!isValidDate) {
    return params.value;
  }
  return formatISO(new Date(params.value));
}

export function toNewId(_: TransformFnParams): string {
  return randomId();
}
