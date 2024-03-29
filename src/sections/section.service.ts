import { ForbiddenException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { checkForExistance } from "src/common/util";
import { PrismaService } from "src/prisma.service";
import { CreateSectionDto, UpdateSectionDto } from "./section.dto";

@Injectable()
export class SectionsService {
  private readonly entityName = "sections";

  constructor(private prisma: PrismaService) {}

  async findAllSectionsByBoard(boardId: string, owner: number) {
    let sections = await this.prisma.sections.findMany({
      where: { boardId: boardId, isDeleted: false },
      select: { id: true, config: true, tasks: true, owner: true },
      orderBy: { createdDate: "asc" },
    });
    if (sections.some((section) => section.owner.toNumber() !== owner))
      throw new ForbiddenException();
    return sections.map((section) => {
      return {
        id: section.id,
        config: section.config,
        tasks: section.tasks.filter((task) => !task.isDeleted),
      };
    });
  }

  findAllSectionsByOwner(owner: number) {
    return this.prisma.sections.findMany({
      where: { owner, isDeleted: false },
    });
  }

  create(createSectionDto: CreateSectionDto) {
    const data: Prisma.sectionsCreateInput = {
      id: createSectionDto.id,
      createdDate: createSectionDto.createdDate,
      config: createSectionDto.config,
      isDeleted: createSectionDto.isDeleted,
      user: { connect: { id: createSectionDto.owner } },
      board: { connect: { id: createSectionDto.boardId } },
    };
    return this.prisma.sections.create({ data });
  }

  async update(updateSectionDto: UpdateSectionDto) {
    await checkForExistance(updateSectionDto.id, this.entityName, true);
    const data: Prisma.sectionsUpdateInput = {
      config: updateSectionDto.config,
      updatedDate: updateSectionDto.updatedDate,
    };
    return this.prisma.sections.update({
      where: { id: updateSectionDto.id },
      data,
    });
  }

  async delete(id: string) {
    await checkForExistance(id, this.entityName, true);
    return this.prisma.sections.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
