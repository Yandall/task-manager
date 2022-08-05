import { Body, Controller, Get, Post, Request } from "@nestjs/common";
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
  createBoard(@Request() req, @Body() createBoardDto: CreateBoardDto) {
    createBoardDto.owner = req.user.id
    return this.boardsService.createBoard(createBoardDto)
  }
}
