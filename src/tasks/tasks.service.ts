import { Injectable } from '@nestjs/common';
@Injectable() // makes singolton, so shareable
export class TasksService {
  private tasks = [];

  getAllTasks() {
    return this.tasks;
  }
  //   doSomething() {}
}
