import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  //   tasksService: TasksService; , no need of this with private
  constructor(private tasksService: TasksService) {
    // this.tasksService = tasksService;
  }

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  //   helloWorld() {
  //     this.tasksService.doSomething();
  //   }
}
