import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  //   tasksService: TasksService; , no need of this with private
  constructor(private tasksService: TasksService) {
    // this.tasksService = tasksService;
  }

  @Get()
  getAllTasks(): Task[] {
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
}
