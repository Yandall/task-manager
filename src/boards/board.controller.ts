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
import { BoardsService } from "./board.service";
import { CreateBoardDto, UpdateBoardDto } from "./board.dto";

@Controller("boards")
@EntityName("boards")
@UseGuards(EntityAclGuard)
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getBoards(@Request() { user }) {
    return this.boardsService.findAllByOwner(user.id);
  }

  @Get(":id")
  getOneBoard(@Param() { id }) {
    return this.boardsService.findOneByOwner(id);
  }

  @Post()
  @SkipAclGuard()
  createBoard(@Request() { user }, @Body() board: CreateBoardDto) {
    board.owner = user.id;
    return this.boardsService.createBoard(board);
  }

  @Put(":id")
  updateBoard(@Param() { id }, @Body() board: UpdateBoardDto) {
    board.id = id;
    return this.boardsService.updateBoard(board);
  }

  @Delete(":id")
  deleteBoard(@Param() { id }) {
    return this.boardsService.deleteBoard(id);
  }
}
