import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, taskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable() // makes singolton, so shareable
export class TasksService {
  private tasks: Task[] = [];

  //   doSomething() {}
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getAllTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task | undefined {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      // bubbles up and hadles by nest, wrap with try catxh to handle manually.
      // can pass optionala argument
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
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
    const found = this.getTaskById(id);
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

  updateTaskStatus(id: string, status: taskStatus): Task {
    // because we're using getTaskById and handling error in there it alo applies in here
    const task = this.getTaskById(id);
    // if (!task) {
    //   return null;
    // }
    task!.status = status;
    return task!;
  }
}
