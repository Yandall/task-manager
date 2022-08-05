import { IsInt, IsString } from "class-validator";

export class CreateBoardDto {

    @IsString()
    folderId: string

    @IsString()
    folderPath: string

    owner: number

    config: unknown

    @IsString()
    name: string
}