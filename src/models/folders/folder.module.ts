import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { FoldersController } from "./folder.controller";
import { FoldersService } from "./folder.service";

@Module({
  controllers: [FoldersController],
  providers: [FoldersService, PrismaService],
})
export class FoldersModule {}
