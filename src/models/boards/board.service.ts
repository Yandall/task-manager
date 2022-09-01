import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateBoardDto, UpdateBoardDto } from "./dto/board.dto";

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  findAllByOwner(owner: number) {
    return this.prisma.boards.findMany({ where: { owner } });
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
    await this.checkForExistance(board.id, true);
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
    await this.checkForExistance(id, true);
    return this.prisma.boards.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  /**
   * Check if an given board exists or is not deleted.
   * Can throw an error if the board is not valid or return boolean
   * @param id Id of the board to search
   * @param throwError If set to true throws error on not found or board deleted. Default false
   * @returns boolean indicating that the board is valid or not.
   */
  async checkForExistance(id: string, throwError = false) {
    const search = await this.prisma.boards.findUnique({
      where: { id },
    });
    if (!search && throwError) throw new NotFoundException();
    if (search.isDeleted && throwError)
      throw new ForbiddenException(
        "The board is already deleted and cannot be edited",
        `Board (${id}) doesn't exists`
      );
    return search && !search.isDeleted;
  }
}
