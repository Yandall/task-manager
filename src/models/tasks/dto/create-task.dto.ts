import { Transform } from "class-transformer";
import { IsObject, IsString } from "class-validator";
import { toISOString } from "src/common/decorators/transformers";
import { IsValidDate } from "src/common/decorators/validators";

export class CreateTaskDto {
  @IsValidDate({ always: false })
  @Transform(toISOString)
  dueDate: string;

  owner: number;

  @IsString()
  board: string;

  @IsObject()
  content: { [key: string]: unknown };

  config: { [key: string]: unknown };
}
