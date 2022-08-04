import { Body, Controller, Get, Post, Request, UseFilters } from "@nestjs/common";
import { PgExceptionFilter } from "src/common/exceptions/pg-exception.filter";
import { CreateFolderDto } from "./dto/create-folder.dto";
import { FoldersService } from "./folder.service";


@Controller('folders')
export class FolderController {
    constructor(private readonly foldersService: FoldersService) {}

    @Get()
    findAll(@Request() req) {
        return this.foldersService.findAll(req.user.id)
    }

    @Post()
    @UseFilters(new PgExceptionFilter())
    create(@Body() folderDto: CreateFolderDto, @Request() req) {
        folderDto.owner = req.user.id
        return this.foldersService.create(folderDto)
    }
}