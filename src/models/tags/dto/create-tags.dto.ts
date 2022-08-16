import { IsString } from "class-validator";

export class CreateTagDto {
  @IsString()
  name: string;

  owner: number;

  config: { [key: string]: unknown };
}
