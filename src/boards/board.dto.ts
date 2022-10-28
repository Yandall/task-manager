import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { formatISO } from "date-fns";
import { toNewId } from "src/common/decorators/transformers";

export class CreateBoardDto {
  @Transform(toNewId)
  id: string;

  @IsString()
  folderId: string;

  owner: number;

  config: {};

  @IsString()
  name: string;

  createdDate: string;

  isDeleted: boolean;

  constructor() {
    this.createdDate = formatISO(new Date());
    this.isDeleted = false;
  }
}

export class UpdateBoardDto {
  @IsString()
  id: string;

  @IsString()
  folderId: string;

  config: {};

  @IsString()
  name: string;

  updatedDate: string;

  constructor() {
    this.updatedDate = formatISO(new Date());
  }
}
