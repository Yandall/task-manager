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

  async findOne(id: string) {
    await checkForExistance(id, this.entityName, true);
    return this.prisma.tasks.findUnique({ where: { id } });
  }

  create(createTaskDto: CreateTaskDto) {
    const data: Prisma.tasksCreateInput = {
      id: createTaskDto.id,
      dueDate: createTaskDto.dueDate,
      createdDate: createTaskDto.createdDate,
      isDeleted: createTaskDto.isDeleted,
      config: createTaskDto.config,
      content: createTaskDto.content,
      user: { connect: { id: createTaskDto.owner } },
      section: { connect: { id: createTaskDto.sectionId } },
    };
    return this.prisma.tasks.create({ data });
  }

  async update(updateTaskDto: UpdateTaskDto) {
    await checkForExistance(updateTaskDto.id, this.entityName, true);
    const data: Prisma.tasksUpdateInput = {
      content: updateTaskDto.content,
      config: updateTaskDto.config,
      dueDate: updateTaskDto.dueDate,
      section: { connect: { id: updateTaskDto.sectionId } },
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
