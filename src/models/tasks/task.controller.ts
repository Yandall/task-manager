import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { CreateTaskDto } from "./dto/task.dto";
import { TasksService } from "./task.service";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasksByOwner(@Request() req) {
    return this.tasksService.findAllTasksByOwner(req.user.id);
  }

  @Post()
  createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    createTaskDto.owner = req.user.id;
    return this.tasksService.createTask(createTaskDto);
  }
}
