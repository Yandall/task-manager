import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateFolderDto } from "./dto/folder.dto";

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  findAll(owner: number) {
    return this.prisma.folders.findMany({ where: { owner } });
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
}
