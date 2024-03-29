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
import { CreateSectionDto, UpdateSectionDto } from "./section.dto";
import { SectionsService } from "./section.service";

@Controller("sections")
@EntityName("sections")
@UseGuards(EntityAclGuard)
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}

  @Get("board/:boardId")
  @SkipAclGuard()
  getSectionsByBoard(@Request() { user }, @Param() { boardId }) {
    return this.sectionsService.findAllSectionsByBoard(boardId, user.id);
  }

  @Get()
  getSectionsByOwner(@Request() { user }) {
    return this.sectionsService.findAllSectionsByOwner(user.id);
  }

  @Post()
  createSection(@Request() { user }, @Body() section: CreateSectionDto) {
    section.owner = user.id;
    return this.sectionsService.create(section);
  }

  @Put(":id")
  updateSection(@Param() { id }, @Body() section: UpdateSectionDto) {
    section.id = id;
    return this.sectionsService.update(section);
  }

  @Delete(":id")
  deleteBoard(@Param() { id }) {
    return this.sectionsService.delete(id);
  }
}
