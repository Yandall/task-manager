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

/**
 * Used to validate if a given propertie is undefined
 * Checks for "=== undefined, === null"
 */
export function IsUndefined(validatorOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isUndefined",
      target: object.constructor,
      propertyName,
      options: validatorOptions,
      validator: {
        validate(value: any, _: ValidationArguments) {
          if (value === undefined || value === null) return true;
          return false;
        },
        defaultMessage(validationArguments?) {
          const prop = validationArguments.property;
          return `Value "${prop}" should be undefined`;
        },
      },
    });
  };
}
