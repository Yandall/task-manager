import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SectionsController } from "./section.controller";
import { SectionsService } from "./section.service";

@Module({
  controllers: [SectionsController],
  providers: [SectionsService, PrismaService],
})
export class SectionsModule {}
