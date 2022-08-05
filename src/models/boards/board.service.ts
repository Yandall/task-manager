import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>
  ) {}

  findAllByOwner(owner: number) {
    return this.boardRepository.findBy({ owner });
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const newBoard = this.boardRepository.create(createBoardDto)
    return this.boardRepository.insert(newBoard)
  }
}
