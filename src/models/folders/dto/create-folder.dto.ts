import { IsString } from "class-validator";
import { IsValidPath } from "src/common/decorators/validators";

export class CreateFolderDto {
  @IsString()
  @IsValidPath('name')
  path: string;

  @IsString()
  name: string;

  owner: number;

  config: unknown;
}
