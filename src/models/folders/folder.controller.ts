import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from "@nestjs/common";
import { InsertTransformInterceptor } from "src/common/interceptors/pg-transform.interceptor";
import { CreateFolderDto } from "./dto/folder.dto";
import { FoldersService } from "./folder.service";

@Controller("folders")
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  findAll(@Request() req) {
    return this.foldersService.findAll(req.user.id);
  }

  @Post()
  @UseInterceptors(new InsertTransformInterceptor())
  create(@Body() folderDto: CreateFolderDto, @Request() req) {
    folderDto.owner = req.user.id;
    return this.foldersService.create(folderDto);
  }
}
