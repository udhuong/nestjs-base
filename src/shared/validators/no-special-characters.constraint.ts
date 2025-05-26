import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'NoSpecialCharacters', async: false })
export class NoSpecialCharactersConstraint implements ValidatorConstraintInterface {
  /**
   * Kiểm tra xem chuỗi có chứa ký tự đặc biệt hay không
   * @param value
   */
  validate(value: string): Promise<boolean> | boolean {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return typeof value === 'string' && !specialCharRegex.test(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must not contain special characters.`;
  }
}

export function NoSpecialCharacters(validationOptions?: any) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'NoSpecialCharacters',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: NoSpecialCharactersConstraint,
    });
  };
}

// @NoSpecialCharacters({
//   message: (args: ValidationArguments) => `Invalid ${args.property}: ${args.value} contains special characters!`,
// }) // Ghi đè thông báo lỗi
