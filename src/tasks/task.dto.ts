import { Transform } from "class-transformer";
import { IsObject, IsString } from "class-validator";
import { formatISO } from "date-fns";
import { toISOString } from "src/common/decorators/transformers";
import { IsValidDate } from "src/common/decorators/validators";
import { randomId } from "src/common/util";

export class CreateTaskDto {
  id: string;

  @IsValidDate({ always: false })
  @Transform(toISOString)
  dueDate: string;

  owner: number;

  @IsString()
  boardId: string;

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

  config: {};

  updatedDate: string;

  constructor() {
    this.updatedDate = formatISO(new Date());
  }
}
