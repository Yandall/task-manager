import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { BoardsController } from "./board.controller";
import { BoardsService } from "./board.service";

@Module({
  providers: [BoardsService, PrismaService],
  controllers: [BoardsController],
})
export class BoardsModule {}
