// validators/date-range-limit.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import moment from "moment";

export function IsDateRangeWithinLimit(
  startKey: string,
  endKey: string,
  maxDays: number,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsDateRangeWithinLimit",
      target: object.constructor,
      propertyName,
      constraints: [startKey, endKey, maxDays],
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const [startKey, endKey, maxDays] = args.constraints;
          const obj: any = args.object;

          const start = obj[startKey];
          const end = obj[endKey];

          if (!start || !end) return true;

          const startMoment = moment(start);
          const endMoment = moment(end);

          if (!startMoment.isValid() || !endMoment.isValid()) return false;

          const diff = endMoment.diff(startMoment, "days");

          return diff >= 0 && diff <= maxDays;
        },
        defaultMessage(args: ValidationArguments) {
          const [startKey, endKey, maxDays] = args.constraints;
          return `The date range between "${startKey}" and "${endKey}" must not exceed ${maxDays} days.`;
        },
      },
    });
  };
}
