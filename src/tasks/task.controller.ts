import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { EntityAclGuard } from "src/auth/guards/crud-acl.guard";
import { EntityName, SkipAclGuard } from "src/common/decorators/metadata";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";
import { TasksService } from "./task.service";

@Controller("tasks")
@EntityName("tasks")
@UseGuards(EntityAclGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @SkipAclGuard()
  getTasksByOwner(@Request() req) {
    return this.tasksService.findAllTasksByOwner(req.user.id);
  }

  @Get(":id")
  getTask(@Param() { id }) {
    return this.tasksService.findOne(id);
  }

  @Post()
  @SkipAclGuard()
  createTask(@Request() req, @Body() task: CreateTaskDto) {
    task.owner = req.user.id;
    return this.tasksService.create(task);
  }

  @Put(":id")
  update(@Param() { id }, @Body() task: UpdateTaskDto) {
    task.id = id;
    return this.tasksService.update(task);
  }

  @Delete(":id")
  delete(@Param() { id }) {
    return this.tasksService.delete(id);
  }
}
