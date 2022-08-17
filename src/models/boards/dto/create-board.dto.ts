import { IsString } from "class-validator";

export class CreateBoardDto {
  @IsString()
  folderId: string;

  @IsString()
  folderPath: string;

  owner: number;

  config: { [key: string]: unknown };

  @IsString()
  name: string;
}
