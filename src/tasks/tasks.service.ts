import { Body, Injectable } from '@nestjs/common';
import { Task, taskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable() // makes singolton, so shareable
export class TasksService {
  private tasks: Task[] = [];

  //   doSomething() {}
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  //   deleteTaskById(id: string): Task | undefined {
  //     return this.tasks.find((task) => {
  //       if (task.id === id) {
  //         this.tasks = this.tasks.filter((task) => task.id !== id);
  //         return task;
  //       }
  //     });
  //   }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  //   createTask(title: string, description: string): Task {
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: taskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
