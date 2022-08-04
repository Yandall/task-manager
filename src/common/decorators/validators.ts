import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

export function IsValidPath(folderName: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isValidPath",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [folderName],
      validator: {
        validate(path: string, args: ValidationArguments) {
            const [propertyName] = args.constraints
            const folderName = args.object[propertyName]
            const links = path.split('/')
            const lastLink = links[links.length - 1]
            return folderName === lastLink
        },
      },
    });
  };
}
