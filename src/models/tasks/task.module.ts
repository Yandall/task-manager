import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TasksController } from "./task.controller";
import { TasksService } from "./task.service";

@Module({
  providers: [TasksService, PrismaService],
  controllers: [TasksController],
})
export class TasksModule {}
