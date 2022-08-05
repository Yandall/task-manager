import { Body, Controller, Get, Post, Request, UseFilters } from "@nestjs/common";
import { PgExceptionFilter } from "src/common/exceptions/pg-exception.filter";
import { CreateTagDto } from "./dto/create-tags.dto";
import { TagsService } from "./tag.service";

@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @Get()
    getTags(@Request() req) {
        return this.tagsService.getTagsByOwner(req.user.id)
    }

    @Post()
    @UseFilters(new PgExceptionFilter())
    createTag(@Request() req, @Body() createTagDto: CreateTagDto) {
        createTagDto.owner = req.user.id
        return this.tagsService.createTag(createTagDto)
    }
}