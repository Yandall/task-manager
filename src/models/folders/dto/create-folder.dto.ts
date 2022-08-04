import { IsInt, IsString } from "class-validator";

export class CreateFolderDto {
  @IsString()
  path: string;

  @IsString()
  name: string;

  owner: number;

  config: unknown;
}
