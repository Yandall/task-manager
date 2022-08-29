import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { isValid as fnsIsValid } from "date-fns";

/**
 * Used to validate a string date. If date is not valid throws an error following the validation pipe.
 * Use only as a property decorator
 */
export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isValidDate",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, _: ValidationArguments) {
          if (!value && validationOptions.always === false) return true;
          return fnsIsValid(new Date(value));
        },
        defaultMessage(validationArguments?) {
          const value = validationArguments.value;
          const propertyName = validationArguments.property;
          const message = value
            ? `Value "${value}" is not a valid date for ${propertyName}`
            : `${propertyName} must be a valid date`;
          return message;
        },
      },
    });
  };
}
