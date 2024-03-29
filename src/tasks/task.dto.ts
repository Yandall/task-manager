import { Transform } from "class-transformer";
import { IsObject, IsString } from "class-validator";
import { formatISO } from "date-fns";
import { toISOString, toNewId } from "src/common/decorators/transformers";
import { IsValidDate } from "src/common/decorators/validators";
import { randomId } from "src/common/util";

export class CreateTaskDto {
  @Transform(toNewId)
  id: string;

  @IsValidDate({ always: false })
  @Transform(toISOString)
  dueDate: string;

  owner: number;

  @IsString()
  sectionId: string;

  @IsObject()
  content: {};

  config: {};

  createdDate: string;

  isDeleted: boolean;

  constructor() {
    this.id = randomId();
    this.createdDate = formatISO(new Date());
    this.isDeleted = false;
  }
}

export class UpdateTaskDto {
  id: string;

  @IsValidDate({ always: false })
  @Transform(toISOString)
  dueDate: string;

  @IsObject()
  content: {};

  @IsString()
  sectionId: string;

  config: {};

  updatedDate: string;

  constructor() {
    this.updatedDate = formatISO(new Date());
  }
}
