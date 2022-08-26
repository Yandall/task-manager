import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from "@nestjs/common";
import { insertTransformInterceptor } from "src/common/interceptors/pg-transform.interceptor";
import { CreateFolderDto } from "./dto/create-folder.dto";
import { FoldersService } from "./folder.service";

@Controller("folders")
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  findAll(@Request() req) {
    return this.foldersService.findAll(req.user.id);
  }

  @Post()
  @UseInterceptors(new insertTransformInterceptor())
  create(@Body() folderDto: CreateFolderDto, @Request() req) {
    folderDto.owner = req.user.id;
    const results = this.foldersService.create(folderDto);
    req.output = results.output;
    return results.dbResult;
  }
}
