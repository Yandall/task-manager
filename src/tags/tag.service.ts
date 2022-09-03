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
    return this.prisma.tags.findMany({ where: { owner } });
  }

  create(createTagDto: CreateTagDto) {
    const data: Prisma.tagsCreateInput = {
      id: createTagDto.id,
      name: createTagDto.name,
      config: createTagDto.config,
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
      config: updateTagDto.config,
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
