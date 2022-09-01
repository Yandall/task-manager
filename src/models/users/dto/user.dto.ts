import { IsEmail, IsString } from "class-validator";
import { formatISO } from "date-fns";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  config: {};

  createdDate: string;

  isActive: boolean;

  constructor() {
    this.createdDate = formatISO(new Date());
    this.isActive = false;
  }
}
