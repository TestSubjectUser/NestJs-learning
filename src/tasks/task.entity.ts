import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity() // Marks this class as an entity, mapping to a database table
export class Task {
  @PrimaryGeneratedColumn('uuid') // Auto-generates a primary key for the table with uuid
  id: string;

  @Column() // Maps the property to a column in the database table
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
