import { TransformFnParams } from "class-transformer";
import { formatISO, isValid } from "date-fns";

export function toISOString(params: TransformFnParams): string {
  const isValidDate = isValid(new Date(params.value));
  if (!isValidDate) {
    return params.value;
  }
  return formatISO(new Date(params.value));
}
