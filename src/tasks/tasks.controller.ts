import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

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
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    console.log(title, ' : ', description);
    return this.tasksService.createTask(title, description);
  }

  //   helloWorld() {
  //     this.tasksService.doSomething();
  //   }
}
