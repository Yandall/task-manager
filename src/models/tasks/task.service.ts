import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateTaskDto } from "./dto/task.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  findAllTasksByOwner(owner: number) {
    return this.prisma.tasks.findMany({ where: { owner } });
  }

  createTask(createTaskDto: CreateTaskDto) {
    const data: Prisma.tasksCreateInput = {
      id: createTaskDto.id,
      dueDate: createTaskDto.dueDate,
      createdDate: createTaskDto.createdDate,
      isDeleted: createTaskDto.isDeleted,
      config: createTaskDto.config,
      user: { connect: { id: createTaskDto.owner } },
      board: { connect: { id: createTaskDto.boardId } },
    };
    return this.prisma.tasks.create({ data });
  }
}
