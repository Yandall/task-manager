import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { formatISO } from "date-fns";
import { toNewId } from "src/common/decorators/transformers";

export class CreateTagDto {
  @Transform(toNewId)
  id: string;

  @IsString()
  name: string;

  owner: number;

  config: {};

  createdDate: string;

  isDeleted: boolean;

  constructor() {
    this.createdDate = formatISO(new Date());
    this.isDeleted = false;
  }
}

export class UpdateTagDto {
  id: string;

  @IsString()
  name: string;

  owner: number;

  config: {};

  updatedDate: string;

  constructor() {
    this.updatedDate = formatISO(new Date());
  }
}
