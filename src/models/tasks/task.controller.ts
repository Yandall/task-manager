import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from "@nestjs/common";
import { insertTransformInterceptor } from "src/common/interceptors/pg-transform.interceptor";
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
  @UseInterceptors(new insertTransformInterceptor())
  createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    createTaskDto.owner = req.user.id;
    const results = this.tasksService.createTask(createTaskDto);
    req.output = results.output;
    return results.dbResult;
  }
}
