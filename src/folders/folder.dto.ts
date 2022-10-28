import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { formatISO } from "date-fns";
import { toNewId } from "src/common/decorators/transformers";

export class CreateFolderDto {
  @Transform(toNewId)
  id: string;

  @IsString()
  name: string;

  owner: number;

  config: {};

  createdDate: string;

  updatedDate: string;

  isDeleted: boolean;

  constructor() {
    this.createdDate = formatISO(new Date());
    this.isDeleted = false;
  }
}

export class UpdateFolderDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  config: {};

  updatedDate: string;

  constructor() {
    this.updatedDate = formatISO(new Date());
  }
}
