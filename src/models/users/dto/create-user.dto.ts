import { IsEmail, IsString} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  config: string;
}
