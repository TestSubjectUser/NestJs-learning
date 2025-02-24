import { Injectable } from '@nestjs/common';
import { Task, taskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
@Injectable() // makes singolton, so shareable
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  //   doSomething() {}

  createTask(title: string, description: string): Task {
    //   createTask(title: string, description: string): Task {
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
