import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { formatISO } from "date-fns";
import { toNewId } from "src/common/decorators/transformers";
import { randomId } from "src/common/util";

export class CreateTagDto {
  @Transform(toNewId)
  id: string;

  @IsString()
  name: string;

  owner: number;

  @IsString()
  color: string;

  createdDate: string;

  isDeleted: boolean;

  constructor() {
    this.id = randomId();
    this.createdDate = formatISO(new Date());
    this.isDeleted = false;
  }
}

export class UpdateTagDto {
  id: string;

  @IsString()
  name: string;

  owner: number;

  @IsString()
  color: string;

  updatedDate: string;

  constructor() {
    this.updatedDate = formatISO(new Date());
  }
}
