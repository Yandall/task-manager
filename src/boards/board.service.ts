import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { checkForExistance } from "src/common/util";
import { PrismaService } from "src/prisma.service";
import { CreateBoardDto, UpdateBoardDto } from "./board.dto";

@Injectable()
export class BoardsService {
  private readonly entityName = "boards";
  constructor(private prisma: PrismaService) {}

  findAllByOwner(owner: number) {
    return this.prisma.boards.findMany({ where: { owner } });
  }

  findOneByOwner(id: string) {
    return this.prisma.boards.findUnique({
      where: { id },
      select: { id: true, config: true, name: true, sections: true },
    });
  }

  createBoard(board: CreateBoardDto) {
    const data: Prisma.boardsCreateInput = {
      id: board.id,
      name: board.name,
      createdDate: board.createdDate,
      folder: { connect: { id: board.folderId } },
      user: { connect: { id: board.owner } },
    };
    return this.prisma.boards.create({ data });
  }

  async updateBoard(board: UpdateBoardDto) {
    await checkForExistance(board.id, this.entityName, true);
    const folder = board.folderId
      ? { connect: { id: board.folderId } }
      : undefined;
    const data: Prisma.boardsUpdateInput = {
      config: board.config,
      name: board.name,
      updatedDate: board.updatedDate,
      folder,
    };
    return this.prisma.boards.update({
      where: { id: board.id },
      data,
    });
  }

  async deleteBoard(id: string) {
    await checkForExistance(id, this.entityName, true);
    return this.prisma.boards.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
