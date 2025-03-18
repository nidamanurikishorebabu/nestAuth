import { IsString, IsNotEmpty, ValidateIf, IsEmail, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate, MinLength, IsNumber, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



@ValidatorConstraint({ name: 'isEmailValid', async: false })
class IsEmailValidConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false;                                                          // if the field is userId field is empty throw the error messege
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);                                            // Validate if it's an email is correct formate or not 
  }

  defaultMessage(args: ValidationArguments) {
    return !args.value ? 'email is required' : 'Invalid email';
  }
}

export class CreateUserDto {
  @ApiProperty()
  @Validate(IsEmailValidConstraint)                                         //apply the validation for userId 
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: "password required" })
  @MinLength(6)
  password: string;

  // @ApiProperty()
  // @IsNotEmpty({ message: "plaese give the first name" })
  // FirstName: string

  // @ApiProperty()
  // @IsNotEmpty({ message: "please give last name" })
  // lastName: string
}
