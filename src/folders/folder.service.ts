import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { checkForExistance } from "src/common/util";
import { PrismaService } from "src/prisma.service";
import { CreateFolderDto, UpdateFolderDto } from "./folder.dto";

@Injectable()
export class FoldersService {
  private readonly entityName = "folders";

  constructor(private prisma: PrismaService) {}

  findAll(owner: number) {
    return this.prisma.folders.findMany({
      select: { id: true, name: true, config: true },
      where: { owner, isDeleted: false },
    });
  }

  findOne(id: string) {
    return this.prisma.folders.findUnique({ where: { id } });
  }

  create(folderDto: CreateFolderDto) {
    const data: Prisma.foldersCreateInput = {
      id: folderDto.id,
      name: folderDto.name,
      config: folderDto.config,
      createdDate: folderDto.createdDate,
      isDeleted: folderDto.isDeleted,
      user: { connect: { id: folderDto.owner } },
    };
    return this.prisma.folders.create({ data });
  }

  async update(folderDto: UpdateFolderDto) {
    await checkForExistance(folderDto.id, this.entityName, true);
    const data: Prisma.foldersUpdateInput = {
      name: folderDto.name,
      config: folderDto.config,
      updatedDate: folderDto.updatedDate,
    };
    return this.prisma.folders.update({ where: { id: folderDto.id }, data });
  }

  async delete(id: string) {
    await checkForExistance(id, this.entityName, true);
    return this.prisma.folders.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
