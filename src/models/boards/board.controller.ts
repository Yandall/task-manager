import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from "@nestjs/common";
import { BoardsService } from "./board.service";
import { CreateBoardDto, UpdateBoardDto } from "./dto/board.dto";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getBoards(@Request() req) {
    return this.boardsService.findAllByOwner(req.user.id);
  }

  @Post()
  createBoard(@Request() req, @Body() createBoardDto: CreateBoardDto) {
    createBoardDto.owner = req.user.id;
    return this.boardsService.createBoard(createBoardDto);
  }

  @Put(":id")
  updateBoard(@Param() { id }, @Body() board: UpdateBoardDto) {
    if (id !== board.id) throw new BadRequestException();
    return this.boardsService.updateBoard(board);
  }

  @Delete(":id")
  deleteBoard(@Param() { id }) {
    return this.boardsService.deleteBoard(id);
  }
}
