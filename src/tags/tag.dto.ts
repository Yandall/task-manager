import { IsString } from "class-validator";
import { formatISO } from "date-fns";
import { randomId } from "src/common/util";

export class CreateTagDto {
  id: string;

  @IsString()
  name: string;

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
