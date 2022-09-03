import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { checkForExistance } from "src/common/util";
import { PrismaService } from "src/prisma.service";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";

@Injectable()
export class TasksService {
  private readonly entityName = "tasks";
  constructor(private prisma: PrismaService) {}

  findAllTasksByOwner(owner: number) {
    return this.prisma.tasks.findMany({ where: { owner } });
  }

  create(createTaskDto: CreateTaskDto) {
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

  async update(updateTaskDto: UpdateTaskDto) {
    await checkForExistance(updateTaskDto.id, this.entityName, true);
    const data: Prisma.tasksUpdateInput = {
      content: updateTaskDto.content,
      config: updateTaskDto.config,
      dueDate: updateTaskDto.dueDate,
      updatedDate: updateTaskDto.updatedDate,
    };
    return this.prisma.tasks.update({ where: { id: updateTaskDto.id }, data });
  }

  async delete(id: string) {
    await checkForExistance(id, this.entityName, true);
    return this.prisma.tasks.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}