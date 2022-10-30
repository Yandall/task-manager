import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { formatISO } from "date-fns";
import { toNewId } from "src/common/decorators/transformers";
import { randomId } from "src/common/util";

export class CreateSectionDto {
  @Transform(toNewId)
  id: string;

  @IsString()
  boardId: string;

  owner: number;

  config: {};

  createdDate: string;

  isDeleted: boolean;

  constructor() {
    this.id = randomId();
    this.createdDate = formatISO(new Date());
    this.isDeleted = false;
  }
}

export class UpdateSectionDto {
  id: string;

  config: {};

  updatedDate: string;

  constructor() {
    this.updatedDate = formatISO(new Date());
  }
}
