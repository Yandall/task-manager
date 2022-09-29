import { IsString } from "class-validator";
import { formatISO } from "date-fns";
import { randomId } from "src/common/util";

export class CreateSectionDto {
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
