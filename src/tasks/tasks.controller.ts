import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, taskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  //   tasksService: TasksService; , no need of this with private
  constructor(private tasksService: TasksService) {
    // this.tasksService = tasksService;
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getAllTasksWithFilters(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Post()
  // Body decorator will assign all request body to body var.
  //   createTask(@Body() body) {
  // cherryPick
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ) {
  createTask(@Body() createTaskDto: CreateTaskDto) {
    // console.log(createTaskDto);
    return this.tasksService.createTask(createTaskDto);
  }

  // path parameter.
  @Get(':id')
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }
  //   deleteTaskById(@Param('id') id: string): Task | undefined {
  //     return this.tasksService.deleteTaskById(id);
  //   }

  //   helloWorld() {
  //     this.tasksService.doSomething();
  //   }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
  }
}
