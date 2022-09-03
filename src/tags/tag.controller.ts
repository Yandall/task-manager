import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { EntityAclGuard } from "src/auth/guards/crud-acl.guard";
import { EntityName, SkipAclGuard } from "src/common/decorators/metadata";
import { CreateTagDto, UpdateTagDto } from "./tag.dto";
import { TagsService } from "./tag.service";

@Controller("tags")
@EntityName("tags")
@UseGuards(EntityAclGuard)
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  @SkipAclGuard()
  getTags(@Request() { user }) {
    return this.tagsService.getTagsByOwner(user.id);
  }

  @Post()
  @SkipAclGuard()
  createTag(@Request() { user }, @Body() tag: CreateTagDto) {
    tag.owner = user.id;
    return this.tagsService.create(tag);
  }

  @Put(":id")
  update(@Param() { id }, @Body() tag: UpdateTagDto) {
    tag.id = id;
    return this.tagsService.update(tag);
  }

  @Delete(":id")
  delete(@Param() { id }) {
    return this.tagsService.delete(id);
  }
}
