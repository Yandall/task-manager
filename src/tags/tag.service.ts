import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { checkForExistance } from "src/common/util";
import { PrismaService } from "src/prisma.service";
import { CreateTagDto, UpdateTagDto } from "./tag.dto";

@Injectable()
export class TagsService {
  private readonly entityName = "tags";
  constructor(private prisma: PrismaService) {}

  getTagsByOwner(owner: number) {
    return this.prisma.tags.findMany({ where: { owner, isDeleted: false } });
  }

  create(createTagDto: CreateTagDto) {
    const data: Prisma.tagsCreateInput = {
      id: createTagDto.id,
      name: createTagDto.name,
      color: createTagDto.color,
      createdDate: createTagDto.createdDate,
      isDeleted: createTagDto.isDeleted,
      user: { connect: { id: createTagDto.owner } },
    };
    return this.prisma.tags.create({ data });
  }

  async update(updateTagDto: UpdateTagDto) {
    await checkForExistance(updateTagDto.id, this.entityName, true);
    const data: Prisma.tagsUpdateInput = {
      name: updateTagDto.name,
      color: updateTagDto.color,
      updatedDate: updateTagDto.updatedDate,
    };
    return this.prisma.tags.update({ where: { id: updateTagDto.id }, data });
  }

  async delete(id: string) {
    await checkForExistance(id, this.entityName, true);
    return this.prisma.tags.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
