// file: validators/is-date-after.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsDateAfter(
  startKey: string,
  endKey: string,
  validationOptions?: ValidationOptions
) {
  return function (constructor: any) {
    registerDecorator({
      name: "IsDateAfter",
      target: constructor,
      propertyName: endKey,
      options: validationOptions,
      constraints: [startKey, endKey],
      validator: {
        validate(_: any, args: ValidationArguments) {
          const [startKey, endKey] = args.constraints;
          const obj = args.object as any;

          const start = new Date(obj[startKey]);
          const end = new Date(obj[endKey]);

          if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;

          return end > start;
        },
        defaultMessage(args: ValidationArguments) {
          const [startKey, endKey] = args.constraints;
          return `${endKey} must be after ${startKey}`;
        },
      },
    });
  };
}
