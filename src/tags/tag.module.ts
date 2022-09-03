import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TagsController } from "./tag.controller";
import { TagsService } from "./tag.service";

@Module({
  controllers: [TagsController],
  providers: [TagsService, PrismaService],
})
export class TagsModule {}
