import { IsString } from "class-validator";
import { formatISO } from "date-fns";
import { randomId } from "src/common/util";

export class CreateFolderDto {
  id: string;

  @IsString()
  name: string;

  owner: number;

  config: {};

  createdDate: string;

  updatedDate: string;

  isDeleted: boolean;

  constructor() {
    this.id = randomId();
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
