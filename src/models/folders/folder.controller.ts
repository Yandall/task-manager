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
import { CreateFolderDto, UpdateFolderDto } from "./folder.dto";
import { FoldersService } from "./folder.service";

@Controller("folders")
@EntityName("folders")
@UseGuards(EntityAclGuard)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  @SkipAclGuard()
  findAll(@Request() req) {
    return this.foldersService.findAll(req.user.id);
  }

  @Post()
  @SkipAclGuard()
  create(@Body() folder: CreateFolderDto, @Request() req) {
    folder.owner = req.user.id;
    return this.foldersService.create(folder);
  }

  @Put(":id")
  update(@Param() { id }, @Body() folder: UpdateFolderDto) {
    folder.id = id;
    return this.foldersService.update(folder);
  }

  @Delete(":id")
  delete(@Param() { id }) {
    return this.foldersService.delete(id);
  }
}
