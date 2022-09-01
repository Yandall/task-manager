import { IsString } from "class-validator";
import { formatISO } from "date-fns";
import { randomId } from "src/common/util";

export class CreateBoardDto {
  id: string;

  @IsString()
  folderId: string;

  owner: number;

  config: {};

  @IsString()
  name: string;

  createdDate: string;

  constructor() {
    this.id = randomId();
    this.createdDate = formatISO(new Date());
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
