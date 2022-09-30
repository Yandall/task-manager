import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SectionsService } from "src/sections/section.service";
import { BoardsController } from "./board.controller";
import { BoardsService } from "./board.service";

@Module({
  providers: [BoardsService, SectionsService, PrismaService],
  controllers: [BoardsController],
})
export class BoardsModule {}
