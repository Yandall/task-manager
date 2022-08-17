import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseFilters,
} from "@nestjs/common";
import { PgExceptionFilter } from "src/common/exceptions/pg-exception.filter";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksService } from "./task.service";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasksByOwner(@Request() req) {
    return this.tasksService.findAllTasksByOwner(req.user.id);
  }

  @Post()
  @UseFilters(new PgExceptionFilter())
  createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    createTaskDto.owner = req.user.id;
    return this.tasksService.createTask(createTaskDto);
  }
}
