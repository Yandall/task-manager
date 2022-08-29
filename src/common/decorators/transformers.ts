import { TransformFnParams } from "class-transformer";
import { formatISO, isValid } from "date-fns";

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
