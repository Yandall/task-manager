import { IsString } from "class-validator";

export class CreateFolderDto {
  @IsString()
  name: string;

  owner: number;

  config: { [key: string]: unknown };
}
