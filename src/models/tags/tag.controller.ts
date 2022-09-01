import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { CreateTagDto } from "./dto/tag.dto";
import { TagsService } from "./tag.service";

@Controller("tags")
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getTags(@Request() req) {
    return this.tagsService.getTagsByOwner(req.user.id);
  }

  @Post()
  createTag(@Request() req, @Body() createTagDto: CreateTagDto) {
    createTagDto.owner = req.user.id;
    return this.tagsService.createTag(createTagDto);
  }
}
