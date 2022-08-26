import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from "@nestjs/common";
import { PgExceptionFilter } from "src/common/exceptions/pg-exception.filter";
import { insertTransformInterceptor } from "src/common/interceptors/pg-transform.interceptor";
import { CreateTagDto } from "./dto/create-tags.dto";
import { TagsService } from "./tag.service";

@Controller("tags")
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getTags(@Request() req) {
    return this.tagsService.getTagsByOwner(req.user.id);
  }

  @Post()
  @UseInterceptors(new insertTransformInterceptor())
  createTag(@Request() req, @Body() createTagDto: CreateTagDto) {
    createTagDto.owner = req.user.id;
    const results = this.tagsService.createTag(createTagDto);
    req.output = results.output;
    return results.dbRes;
  }
}
