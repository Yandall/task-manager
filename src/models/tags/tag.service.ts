import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateTagDto } from "./dto/tag.dto";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  getTagsByOwner(owner: number) {
    return this.prisma.tags.findMany({ where: { owner } });
  }

  createTag(createTagDto: CreateTagDto) {
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
}
