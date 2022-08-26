import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from "@nestjs/common";
import { insertTransformInterceptor } from "src/common/interceptors/pg-transform.interceptor";
import { BoardsService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getBoardsByPath(@Request() req) {
    return this.boardsService.findAllByOwner(req.user.id);
  }

  @Post()
  @UseInterceptors(new insertTransformInterceptor())
  createBoard(@Request() req, @Body() createBoardDto: CreateBoardDto) {
    createBoardDto.owner = req.user.id;
    const results = this.boardsService.createBoard(createBoardDto);
    req.output = results.output;
    return results.dbResult;
  }
}
